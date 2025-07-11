import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiUrl = 'https://68712f7a7ca4d06b34b9a446.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/team`);
  }

  addNewTeamMember(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiUrl}/team`, team);
  }
}
