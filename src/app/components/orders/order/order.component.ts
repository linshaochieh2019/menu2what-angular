import { Component, OnInit} from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: string | null = null;
  order$: Observable<Order | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    protected orderService: OrderService,
  ) {}

  ngOnInit() {
    // Using switchMap to manage observables and avoid nesting subscriptions
    this.order$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const orderId = params.get('orderId');
        if (orderId) {
          return this.orderService.getOrder(orderId);
        }
        return [undefined]; // Returns an empty observable when orderId is not present
      })
    );
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

  removeItem(order: Order, index: number): void {
    const updatedItems = [...order.items];
    updatedItems.splice(index, 1);

    const updatedOrder: Order = {
      ...order,
      items: updatedItems,
    };

    this.orderService
      .updateOrder(updatedOrder)
      .then(() => {
        console.log(`Item removed from order ${order.orderId}`);
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  }
}
