import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared-module';
import { OrderLists } from '../../order-lists/order-lists';

import { MatSidenav } from '@angular/material/sidenav';
import { Dashboard } from '../../dashboard/dashboard';
import { TeamLists } from '../../team-lists/team-lists';
import { Products } from '../../products/products';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SharedModule, Dashboard, TeamLists, OrderLists, Products],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss'],
})
export class SideBar {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded: boolean = false;
  isShowing = false;
  activeTab: string = 'home';

  toggleSidebar() {
    // console.log('this.isExpanded', this.isExpanded);
    this.isExpanded = !this.isExpanded;
    console.log('this.isExpanded', this.isExpanded);
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
