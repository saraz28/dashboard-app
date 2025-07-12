import { SharedModule } from './../shared/shared-module';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrderListsService } from './services/order-lists-service';
import { orders } from './model/order-lists';
import { PageEvent } from '@angular/material/paginator';
import { LoaderService } from '../shared/loader/loader-service';

interface Status {
  name: string;
}

@Component({
  selector: 'app-order-lists',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order-lists.html',
  styleUrls: ['./order-lists.scss'],
})
export class OrderLists implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  products: orders[] = [];
  status: Status[] | undefined;
  selectedStatus: Status | null = null;
  selectedOrderType: orders | null = null;
  selectedPrice: orders | null = null;

  length = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent!: PageEvent;
  pagedOrders: orders[] = [];

  constructor(
    private orderListsService: OrderListsService,
    private loadingService: LoaderService
  ) {}

  ngOnInit() {
    console.log('', this.products);
    this.loadingService.setLoading(true);
    this.orderListsService.getProducts().subscribe((data) => {
      this.products = data;
      this.updatePagedOrders();
      this.loadingService.setLoading(false);
    });

    this.status = [
      { name: 'Delivered' },
      { name: 'Shipped' },
      { name: 'Processing' },
    ];
  }

  // handling search
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.pageIndex = 0;
      this.updatePagedOrders();
    }
  }

  onFilterChange() {
    this.pageIndex = 0;
    this.updatePagedOrders();
  }

  //  filtering each item and search
  get filteredOrders() {
    let filtered = this.products;

    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const lowerCase = this.searchTerm.toLowerCase();
      filtered = filtered.filter((order) =>
        Object.values(order).some((value) =>
          String(value).toLowerCase().includes(lowerCase)
        )
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(
        (order) => order.status === this.selectedStatus?.name
      );
    }

    if (this.selectedOrderType) {
      filtered = filtered.filter(
        (order) => order.order_id === this.selectedOrderType?.order_id
      );
    }
    if (this.selectedPrice) {
      filtered = filtered.filter(
        (order) => order.total_price === this.selectedPrice?.total_price
      );
    }

    return filtered;
  }

  // reset filtering
  resetFiltered() {
    this.selectedOrderType = null;
    this.selectedPrice = null;
    this.selectedStatus = null;
    this.pageIndex = 0;
    this.updatePagedOrders();
  }
  // update pagination
  updatePagedOrders() {
    this.loadingService.setLoading(true);
    const all = this.filteredOrders;
    this.length = all.length;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrders = all.slice(start, end);
    this.loadingService.setLoading(false);
  }
   
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.searchTerm = '';
    this.updatePagedOrders();
  }
}
