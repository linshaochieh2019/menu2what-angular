import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: string | null = null;
  order: Order | undefined = undefined;
  orderSubscription: Subscription | undefined; // Declare orderSubscription as a property

  constructor(
    private route: ActivatedRoute,
    protected orderService: OrderService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('orderId');
      if (this.orderId) {
        // Subscribe to the order observable
        this.orderSubscription = this.orderService
          .getOrderById(this.orderId)
          .subscribe((order) => {
            this.order = order; // Update the order property with the latest data
            console.log('Order loaded:', this.order);
          });
      }
    });
  }

  ngOnDestroy() {
    console.log('OrderComponent destroyed');
    this.orderSubscription?.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  // Helper method to get object keys
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // Helper method to get option values from the array of objects
  getOptionValue(option: any): string {
    if (!option) return '';
    return option[Object.keys(option)[0]];
  }

  removeItem(orderId: string, index: number): void {
    const updatedItems = [...this.orderService.order!.items];
    updatedItems.splice(index, 1);

    const updatedOrder: Order = {
      ...this.orderService.order!,
      items: updatedItems,
    };

    this.orderService
      .updateOrder(updatedOrder)
      .then(() => {
        console.log(`Item removed from order ${orderId}`);
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });

    this.orderService.order = updatedOrder;
  }
}
