import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { MatSidenav } from '@angular/material/sidenav';
import { OrderLists } from '../order-lists/order-lists';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, OrderLists],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded: boolean = false;
  isShowing = false;
  // @ViewChild('drawerRef') drawerRef!: Drawer;
  activeTab: string = 'home';
  // closeCallback(e: any): void {
  //   this.drawerRef.close(e);
  // }

  ngOnInit() {}

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
