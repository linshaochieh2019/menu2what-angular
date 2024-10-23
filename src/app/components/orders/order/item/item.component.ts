import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/store.model';
import { Order, OrderItem } from '../../../../models/order.model';
import { OrderService } from '../../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() item: Product | undefined;
  orderId: string | null = null;
  selectedOptions: { [key: string]: string } = {};

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
    console.log(this.selectedOptions);
  }

  isSelected(optionName: string, optionValue: string): boolean {
    // Check if the option is selected
    return this.selectedOptions[optionName] === optionValue;
  }

  hasSelections(): boolean {
    return Object.keys(this.selectedOptions).length > 0;
  }

  getSelectedPrice(): number | undefined {
    // Check if item or any selected option is missing
    if (!this.item || !this.item.priceSetting) return undefined;

    // Filter the price settings based on all selected options (e.g., size, ice, sugar)
    const matchedPriceSetting = this.item.priceSetting.find((setting) => {
      // Ensure that every condition in this price setting matches the selected options
      return setting.conditions.every((condition) => {
        const optionKey = Object.keys(condition)[0]; // For example, 'size', 'ice', 'sugar'
        const selectedOption = this.selectedOptions[optionKey];

        // Check if the selected option matches the condition
        return selectedOption === condition[optionKey];
      });
    });

    // Return the matching price if found, otherwise undefined
    return matchedPriceSetting ? matchedPriceSetting.price : undefined;
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
      price: this.getSelectedPrice() ?? 0,
      orderedBy: 'user',
    };

    // update order object stored in orderService
    this.orderService.addOrderItem(this.orderId!, orderItem);

    // Clear the selections after confirming
    this.clearSelections(); // Clear the selections after confirming
  }
}
