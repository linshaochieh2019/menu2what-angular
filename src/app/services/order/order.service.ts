import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderItem } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  public orders: Observable<Order[]>;
  public order: Order | undefined;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = this.firestore.collection('orders');
    this.orders = this.ordersCollection.valueChanges({ idField: 'orderId' }); // adds 'orderId' to the document
  }

  // Create a new order
  createOrder(order: Order): Promise<void> {
    const orderId = this.firestore.createId();
    order.orderId = orderId; // assign the generated ID to the order
    this.order = order;
    return this.ordersCollection.doc(orderId).set(order);
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.orders;
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.ordersCollection
      .doc<Order>(orderId)
      .valueChanges()
      .pipe(
        map((order) => order || undefined) // Ensure it returns undefined if no order is found
      );
  }

  addOrderItem(orderId: string, orderItem: OrderItem) {
    // Refresh the order to get the latest data
    this.getOrderById(orderId).subscribe((order) => {
      this.order = order;
      this.order?.items.push(orderItem);
      this.updateOrder(this.order!);
    });
  }

  // Update an order by ID
  updateOrder(order: Order): Promise<void> {
    return this.ordersCollection.doc(order.orderId).update(order);
  }

  // Delete an order by ID
  deleteOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).delete();
  }
}
