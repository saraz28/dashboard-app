import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLists } from './team-lists';

describe('TeamLists', () => {
  let component: TeamLists;
  let fixture: ComponentFixture<TeamLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
