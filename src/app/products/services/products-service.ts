import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = 'https://api.escuelajs.co/api/v1';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
  getProductsById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/products/${id}`)
  }
}
