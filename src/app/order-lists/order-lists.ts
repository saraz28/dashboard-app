import { SharedModule } from './../shared/shared-module';
import { Component, OnInit } from '@angular/core';
import { OrderListsService } from './services/order-lists-service';
import { HttpClientModule } from '@angular/common/http';
import { orders } from './model/order-lists';
import { PageEvent } from '@angular/material/paginator';

interface Status {
  name: string;
}

@Component({
  selector: 'app-order-lists',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order-lists.html',
  styleUrl: './order-lists.scss',
})
export class OrderLists implements OnInit {
  products: orders[] = [];

  constructor(private orderListsService: OrderListsService) {}

  status: Status[] | undefined;
  selectedStatus: Status | null = null;
  selectedOrderType: orders | null = null;
  selectedPrice: orders | null = null;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent!: PageEvent;

  ngOnInit() {
    this.orderListsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.status = [
      { name: 'Delivered' },
      { name: 'Shipped' },
      { name: 'Processing' },
    ];
  }

  get filteredOrders() {
    let filtered = this.products;

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

  resetFiltered() {
    this.selectedOrderType = null;
    this.selectedPrice = null;
    this.selectedStatus = null;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
