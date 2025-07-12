import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared-module';
import { OrderLists } from '../../order-lists/order-lists';

import { MatSidenav } from '@angular/material/sidenav';
import { Dashboard } from '../../dashboard/dashboard';
import { TeamLists } from '../../team-lists/team-lists';
import { Products } from '../../products/products';
import { SearchService } from '../search/search-service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SharedModule, Dashboard, TeamLists, OrderLists, Products],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss'],
})
export class SideBar implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  searchValue = '';

  isExpanded: boolean = false;
  isShowing = false;
  activeTab: string = 'dashboard';

  constructor() {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia(
      '(pointer: coarse), (max-width: 1199px)'
    );
    this.isMobile.set(this._mobileQuery.matches);

    this._mobileQueryListener = () => {
      this.isMobile.set(this._mobileQuery.matches);
      // Optionally auto-close sidenav on resize to mobile
      if (this._mobileQuery.matches && this.sidenav) {
        this.sidenav.close();
      }
    };

    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  // to shared search between component
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

  //close sidebar on click nav item
  closeIfMobile() {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }
  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
