import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared-module';
import { OrderLists } from '../../order-lists/order-lists';

import { MatSidenav } from '@angular/material/sidenav';
import { Dashboard } from '../../dashboard/dashboard';
import { TeamLists } from '../../team-lists/team-lists';
import { Products } from '../../products/products';
import { SearchService } from '../search/search-service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SharedModule, Dashboard, TeamLists, OrderLists, Products],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss'],
})
export class SideBar {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  constructor() {}

  searchValue = '';

  isExpanded: boolean = false;
  isShowing = false;
  activeTab: string = 'dashboard';

  onSearchChange(value: string) {
    this.search = value;
    this.searchChange.emit(value);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
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
