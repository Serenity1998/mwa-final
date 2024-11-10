import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem, OrderNum } from '../models/order_model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _httpClient: HttpClient) {}
  getOrders = (): Observable<OrderNum[]> => {
    return this._httpClient.get<OrderNum[]>('http://localhost:3000/api/order?sort=desc');
  };
  getLeftItemsOfOrder = (id: string): Observable<OrderItem[]> => {
    return this._httpClient.get<OrderItem[]>(`http://localhost:3000/api/items?id=${id}`);
  };
  addItem = (item: any): Observable<any> => {
    return this._httpClient.post<any>(`http://localhost:3000/api/items/add_item`, item);
  };
  getCurrentOrderItems = (): Observable<OrderNum> => {
    return this._httpClient.get<OrderNum>(`http://localhost:3000/api/order/latest`);
  };
  getCurrentItem = (id: string): Observable<OrderItem[]> => {
    return this._httpClient.get<OrderItem[]>(`http://localhost:3000/api/items/get_item?id=${id}`);
  };
  markItem = (id: string): Observable<OrderNum> => {
    return this._httpClient.get<OrderNum>(`http://localhost:3000/api/items/mark_item?id=${id}`)
  }
  finish = (): Observable<OrderNum> => {
    return this._httpClient.get<OrderNum>(`http://localhost:3000/api/order/create`)
  }
  deleteTrip = (id: string): Observable<OrderNum> => {
    return this._httpClient.delete<OrderNum>(`http://localhost:3000/api/items/remove_item?id=${id}`)
  }
}
