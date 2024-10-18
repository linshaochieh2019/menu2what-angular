import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/store.model';

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
}
