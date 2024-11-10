import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}
  register = (username: string, password: string): Observable<Auth> => {
    return this._httpClient.post<Auth>('http://localhost:3000/api/auth/register', { username, password });
  };
  login = (username: string, password: string): Observable<Auth> => {
    return this._httpClient.post<Auth>('http://localhost:3000/api/auth/login', { username, password });
  };
}
