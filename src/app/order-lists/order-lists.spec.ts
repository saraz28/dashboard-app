import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLists } from './order-lists';

describe('OrderLists', () => {
  let component: OrderLists;
  let fixture: ComponentFixture<OrderLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
