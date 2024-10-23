import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  newOrder: Order = this.initializeOrder(); // Order form binding

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
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
      items: [],
    };
  }

  // Create a new order
  createOrder(): void {
    // Set the created time
    this.newOrder.createdTime = new Date().toISOString();
    this.orderService.createOrder(this.newOrder).then(() => {
      console.log('Order created successfully!');
      this.newOrder = this.initializeOrder(); // Reset the form
    });

    // Navigate to the orders list
    this.router.navigate(['/orders']); // Navigate to the orders list or desired route
  }
}
