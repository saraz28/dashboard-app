import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiUrl = 'https://fake-json-api.mock.beeceptor.com';

  constructor(private http: HttpClient) {}

  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/users`);
  }
}
