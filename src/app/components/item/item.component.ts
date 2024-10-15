import { Component, Input } from '@angular/core';
import { Product } from '../../models/store.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() item: Product | undefined;
  selectedOptions: { [key: string]: string } = {};

  constructor() {}

  ngOnInit() {
    // Initialize the item component
    console.log(this.item);
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

  getSelectedPrice(): number | undefined {
    // Find the price based on the selected size
    if (!this.item || !this.selectedOptions['size']) return undefined;

    const selectedSize = this.selectedOptions['size'];

    // Find the matching price for the selected size
    const priceSetting = this.item.priceSetting.find((setting) =>
      setting.conditions.find((cond) => cond.size === selectedSize)
    );

    return priceSetting ? priceSetting.price : undefined;
  }

  // Clear all selections
  clearSelections() {
    this.selectedOptions = {}; // Reset the selected options
  }
}
