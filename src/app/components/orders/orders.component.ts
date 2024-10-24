import { Component } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders$!: Observable<Order[]>; // Use definite assignment assertion
  selectedOrder: Order | null = null;
  newOrder: Order = this.initializeOrder();  // Order form binding

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
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
      items: []
    };
  }

  // Create a new order
  createOrder(): void {

    // Set the created time
    this.newOrder.createdTime = new Date().toISOString();

    // Create the order
    this.orderService.createOrder(this.newOrder).then(() => {
      console.log('Order created successfully');
      this.newOrder = this.initializeOrder(); // Reset the form
    }).catch(error => console.error('Error creating order:', error));
  }

  // Select an order for editing
  editOrder(order: Order): void {
    this.selectedOrder = { ...order }; // Copy the selected order data
  }

  // Update an existing order
  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService.updateOrder(this.selectedOrder).then(() => {
        console.log('Order updated successfully');
        this.selectedOrder = null; // Reset after update
      }).catch(error => console.error('Error updating order:', error));
    }
  }

  // Delete an order
  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).then(() => {
      console.log('Order deleted successfully');
    }).catch(error => console.error('Error deleting order:', error));
  }
}

