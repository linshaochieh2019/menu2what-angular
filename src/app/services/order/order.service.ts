import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  public orders: Observable<Order[]>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = this.firestore.collection('orders');
    this.orders = this.ordersCollection.valueChanges({ idField: 'orderId' }); // adds 'orderId' to the document
  }

  // Create a new order
  createOrder(order: Order): Promise<void> {
    const orderId = this.firestore.createId();
    order.orderId = orderId; // assign the generated ID to the order
    return this.ordersCollection.doc(orderId).set(order);
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.orders;
  }

  // Get a specific order by ID
  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.ordersCollection.doc(orderId).get().pipe(
      map(doc => doc.exists ? (doc.data() as Order) : undefined)
    );
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
