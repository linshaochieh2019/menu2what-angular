export interface Store {
  storeId: string;
  storeName: string;
  menu: Product[];
}

export interface Product {
  productId: string;
  productName: string;
  description: string;
  imageUrl: string;
  priceSetting: PriceSetting[];
  options: Option[];
}

export interface PriceSetting {
  conditions: Condition[];
  price: number;
}

export interface Condition {
  [key: string]: string;  // Allows indexing by string keys
}

export interface Option {
  optionName: string;
  optionValue: string[];
}
