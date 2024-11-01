import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Store } from '../../../models/store.model';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent implements OnInit {
  store: Store | undefined;
  newOrder: Order = this.initializeOrder(); // Order form binding
  addingOrder: boolean = false;

  constructor(
    public storeService: StoreService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const storeId = this.route.snapshot.paramMap.get('id');

    if (storeId) {
      this.storeService.getStoreById(storeId).subscribe((store) => {
        this.store = store;
      });
    }
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

  startOrder() {
    if (this.store && this.store.storeId) {
      this.newOrder.storeId = this.store.storeId;
      this.addingOrder = true;
    } else {
      // Handle the case where store or storeId is not available
      console.error('Store ID not found.');
      // You might want to display an error message to the user or handle it differently
    }
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
