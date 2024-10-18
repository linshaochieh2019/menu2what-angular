import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: string | null = null;
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.orderService
        .getOrderById(this.orderId)
        .subscribe((order: Order | undefined) => {
          this.order = order;
        });
    }
  }
}
