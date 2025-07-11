import { Component, OnInit } from '@angular/core';
import { TeamService } from './services/team-service';
import { Team } from './model/team';
import { SharedModule } from '../shared/shared-module';

@Component({
  selector: 'app-team-lists',
  imports: [SharedModule],
  templateUrl: './team-lists.html',
  styleUrl: './team-lists.scss',
})
export class TeamLists implements OnInit {
  teamData: Team[] = [];
  constructor(private teamService: TeamService) {}
  ngOnInit(): void {
    this.teamService.getTeam().subscribe((data) => {
      this.teamData = data;
      console.log('date', data);
    });
  }
}
