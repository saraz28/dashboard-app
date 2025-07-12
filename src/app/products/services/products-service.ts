import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDto } from '../model/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = 'https://api.escuelajs.co/api/v1';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsDto[]> {
    return this.http.get<ProductsDto[]>(`${this.apiUrl}/products`);
  }
  getProductsById(id: number): Observable<ProductsDto> {
    return this.http.get<ProductsDto>(`${this.apiUrl}/products/${id}`);
  }
}
