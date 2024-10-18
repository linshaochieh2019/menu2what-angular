import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  newOrder: Order = this.initializeOrder(); // Order form binding

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const storeId = params['storeId'];
      if (storeId) {
        this.newOrder.storeId = storeId;
      }
    });
  }

  // Initialize an empty order
  initializeOrder(): Order {
    return {
      orderId: '',
      storeId: '',
      orderDeadline: '',
      deliverTime: '',
      status: '',
      createdTime: '',
    };
  }

  // Create a new order
  createOrder(): void {
    // Console log the new order
    console.log(this.newOrder);


    // Set the created time
    this.newOrder.createdTime = new Date().toISOString();
    this.orderService.createOrder(this.newOrder).then(() => {
      console.log('Order created successfully!');
      this.newOrder = this.initializeOrder(); // Reset the form
    });
  }
}
