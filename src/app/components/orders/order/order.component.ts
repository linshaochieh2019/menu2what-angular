import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { StoreService } from '../../../services/store/store.service';
import { Store } from '../../../models/store.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map, of } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: string | null = null;
  orderWithStore$!: Observable<{
    order: Order | undefined;
    store: Store | undefined;
  }>;
  isEditing: boolean = false;
  originalOrder: Order | undefined; //Only used for editing

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected orderService: OrderService,
    protected storeService: StoreService
  ) {}

  ngOnInit() {
    this.orderWithStore$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const orderId = params.get('orderId');
        if (orderId) {
          return this.orderService.getOrder(orderId).pipe(
            switchMap((order) => {
              if (order && order.storeId) {
                // Store a copy of the original order for canceling edits
                this.originalOrder = { ...order };

                return this.storeService.getStoreById(order.storeId).pipe(
                  map((store) => ({
                    order: {
                      ...order,
                      // Sort items by product name
                      items: order.items.sort((a, b) =>
                        a.productName.localeCompare(b.productName)
                      ),
                    },
                    store: store,
                  }))
                );
              }
              return of({ order: order, store: undefined }); // Explicitly return the order, even if the store is undefined
            })
          );
        }
        return of({ order: undefined, store: undefined }); // Return an empty observable when orderId is not present
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

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
    if (this.originalOrder) {
      this.orderWithStore$ = this.orderWithStore$.pipe(
        map((orderData) => ({
          ...orderData,
          order: this.originalOrder, // Replace with the original order
        }))
      );
    }
  }

  updateOrder(order: Order): void {
    this.orderService
      .updateOrder(order)
      .then(() => {
        console.log('Order updated successfully');
        alert('Order updated successfully');
        this.isEditing = false;
      })
      .catch((error) => console.error('Error updating order:', error));
  }
}
