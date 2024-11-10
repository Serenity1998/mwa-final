import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import { OrderNum, OrderItem } from '../../models/order_model';
import { environment } from '../../environments/environment.development';
import { OrderPipe } from '../order.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OrderPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data!: OrderNum[];
  current!: OrderNum;
  leftItems!: any[];
  title!: string;
  token!: string | null;

  constructor(private _orderService: OrderService) {
    this.title = environment.title
  }

  ngOnInit(): void {
    this._orderService.getOrders().subscribe((data) => {
      this.data = data;
    });
    this._orderService.getCurrentOrderItems().subscribe((data) => {
      this.current = data
      console.log(data)
      console.log(this.current?.order_items.length)
    })
    this.token = localStorage.getItem('token')
  }

  fetchLeftItems = (id: string) => {
    this._orderService.getLeftItemsOfOrder(id).subscribe((data) => {
      let orderItems: any[] = []
      data.forEach((value) => orderItems.push({...value, id: this.current._id}));
      this.leftItems = orderItems
    });
  };

  markItem(id: string) { 
    this._orderService.markItem(id).subscribe((data) => {
      this.current = data
      console.log(this.current?.order_items)
    })
  }

  finish() {
    this._orderService.finish().subscribe((data) => {
      this.current = data
      console.log(data)
    })
  }
}
