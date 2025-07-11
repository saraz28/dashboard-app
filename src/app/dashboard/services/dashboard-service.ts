import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statstics } from '../model/statistic';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrl = 'https://tdd0e428c746a547c2ca.free.beeceptor.com';
  constructor(private http: HttpClient) {}

  getStatstics(): Observable<Statstics> {
    return this.http.get<Statstics>(`assets/mock/statistics.json`);
  }
}
