import { TestBed } from '@angular/core/testing';

import { OrderListsService } from './order-lists-service';

describe('OrderListsService', () => {
  let service: OrderListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
