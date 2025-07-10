import { SharedModule } from './../shared/shared-module';
import { Component, OnInit } from '@angular/core';
import { OrderListsService } from './services/order-lists-service';
import { HttpClientModule } from '@angular/common/http';
import { orders } from './model/order-lists';

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
  // get filteredOrders() {
  //   if (!this.selectedStatus) return this.products;
  //   if (!this.selectedOrderType) return this.products;

  //   if (this.selectedStatus) {
  //     return this.products.filter(
  //       (order) => order.status === this.selectedStatus.name
  //     );
  //   }
  //   if (this.selectedOrderType) {
  //     return this.products.filter((orderType) => {
  //       console.log('selectedOrderType', this.selectedOrderType.order_id);
  //       console.log('order', orderType);

  //       orderType.order_id === this.selectedOrderType.order_id;
  //     });
  //   }
  //   return this.products;
  // }
}
