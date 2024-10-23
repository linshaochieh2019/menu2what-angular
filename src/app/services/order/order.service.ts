import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Order, OrderItem } from '../../models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private orderSubject = new BehaviorSubject<Order | undefined>(undefined);
  order$: Observable<Order | undefined> = this.orderSubject.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = this.firestore.collection('orders');
  }

  // Get all orders as an observable
  getOrders(): Observable<Order[]> {
    return this.ordersCollection.valueChanges({ idField: 'orderId' });
  }

  // Get a single order by ID as an observable
  getOrder(orderId: string): Observable<Order | undefined> {
    return this.ordersCollection
      .doc(orderId)
      .valueChanges()
      .pipe(
        map((order) => {
          if (order) {
            this.orderSubject.next(order as Order); // Emit the order to the subject
            return order as Order;
          } else {
            this.orderSubject.next(undefined); // Emit undefined if no order is found
            return undefined;
          }
        })
      );
  }

  // Create a new order
  createOrder(order: Order): Promise<void> {
    const orderId = this.firestore.createId();
    order.orderId = orderId; // assign the generated ID to the order
    return this.ordersCollection.doc(orderId).set(order);
  }

  // Update an order by ID
  updateOrder(order: Order): Promise<void> {
    this.ordersCollection
      .doc(order.orderId)
      .update(order)
      .then(
        () => {
          this.orderSubject.next(order); // Emit the updated order to the subject
        },
        (error) => {
          console.error('Error updating order: ', error);
        }
      );
    return Promise.resolve();
  }

  // Delete an order by ID
  deleteOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).delete();
  }
}
