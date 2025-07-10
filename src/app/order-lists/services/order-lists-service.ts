import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orders } from '../model/order-lists';

@Injectable({
  providedIn: 'root',
})
export class OrderListsService {
  apiUrl = 'https://fake-store-api.mock.beeceptor.com';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<orders[]> {
    return this.http.get<orders[]>(`${this.apiUrl}/api/orders`);
  }
}
