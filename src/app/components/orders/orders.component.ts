import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { StoreService } from '../../services/store/store.service';
import { Order } from '../../models/order.model';
import { Store } from '../../models/store.model';
import { Observable, map, switchMap, forkJoin, filter } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  selectedOrder: Order | null = null;
  ordersWithStores$!: Observable<{ order: Order; store: Store }[]>;

  constructor(private orderService: OrderService, private storeService: StoreService) {}

  ngOnInit(): void {
    this.ordersWithStores$ = this.orderService.getOrders().pipe(
      switchMap((orders) => {
        // Map each order to an observable that fetches the corresponding store
        const ordersWithStoreObservables = orders.map((order) =>
          this.storeService.getStoreById(order.storeId).pipe(
            map((store) => ({ order, store })), // Map to an object containing order and store
            filter((result): result is { order: Order; store: Store } => !!result.store) // Filter out undefined stores
          )
        );

        // Use forkJoin to wait for all observables to complete and emit as an array
        return forkJoin(ordersWithStoreObservables);
      })
    );
  }

  // Select an order for editing
  editOrder(order: Order): void {
    this.selectedOrder = { ...order }; // Copy the selected order data
  }

  // Update an existing order
  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService
        .updateOrder(this.selectedOrder)
        .then(() => {
          console.log('Order updated successfully');
          this.selectedOrder = null; // Reset after update
        })
        .catch((error) => console.error('Error updating order:', error));
    }
  }

  // Delete an order
  deleteOrder(orderId: string): void {
    this.orderService
      .deleteOrder(orderId)
      .then(() => {
        console.log('Order deleted successfully');
      })
      .catch((error) => console.error('Error deleting order:', error));
  }
}
