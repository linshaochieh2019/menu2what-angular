import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/store.model';
import { Order, OrderItem } from '../../../../models/order.model';
import { OrderService } from '../../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
})
export class ItemComponent {
  @Input() item: Product | undefined;
  orderId: string | null = null;
  selectedOptions: { [key: string]: string } = {};
  selectedPrice: number | undefined;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
  }

  selectOption(optionName: string, optionValue: string) {
    // Save the selected option for each optionName
    this.selectedOptions[optionName] = optionValue;
    this.calculateSelectedPrice();
  }

  isSelected(optionName: string, optionValue: string): boolean {
    // Check if the option is selected
    return this.selectedOptions[optionName] === optionValue;
  }

  hasSelections(): boolean {
    return Object.keys(this.selectedOptions).length > 0;
  }

  calculateSelectedPrice(): void {
    // Check if item or any selected option is missing
    if (!this.item || !this.item.priceSetting) {
      this.selectedPrice = undefined;
      return;
    }

    // Filter the price settings based on all selected options (e.g., size, ice, sugar)
    const matchedPriceSetting = this.item.priceSetting.find((setting) => {
      return setting.conditions.every((condition) => {
        const optionKey = Object.keys(condition)[0];
        const selectedOption = this.selectedOptions[optionKey];
        return selectedOption === condition[optionKey];
      });
    });

    this.selectedPrice = matchedPriceSetting
      ? matchedPriceSetting.price
      : undefined;
  }

  // Clear all selections
  clearSelections() {
    this.selectedOptions = {}; // Reset the selected options
  }

  onConfirm() {
    // convert selectedOptions to OrderItem options
    const orderItemOptions = Object.keys(this.selectedOptions).map(
      (optionName) => {
        return { [optionName]: this.selectedOptions[optionName] };
      }
    );

    // add productId and options to the order item
    const orderItem: OrderItem = {
      productId: this.item?.productId ?? '',
      options: orderItemOptions,
      price: this.selectedPrice ?? 0,
      orderedBy: 'user',
    };

    if (!this.orderId) {
      console.error('Order ID is missing');
      return;
    }

    // Add the logic to directly update the order in the component
    this.orderService
      .getOrder(this.orderId)
      .pipe(
        switchMap((order) => {
          if (!order) {
            throw new Error(`Order with ID ${this.orderId} not found.`);
          }

          const updatedOrder = {
            ...order,
            items: [...order.items, orderItem],
          };

          return this.orderService.updateOrder(updatedOrder);
        }),
        take(1) // Automatically unsubscribe after the first update
      )
      .subscribe({
        next: () => {
          console.log(`Order item successfully added to order ${this.orderId}`);
          this.clearSelections(); // Clear selections after successful update
          this.selectedPrice = undefined; // Reset the selected price
        },
        error: (err) => {
          console.error('Error adding item to order:', err);
        },
      });
  }
}
