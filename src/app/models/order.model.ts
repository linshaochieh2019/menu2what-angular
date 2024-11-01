export interface Order {
  orderId: string;
  storeId: string;
  orderDeadline: string;
  deliverTime: string;
  status: string;
  createdTime: string;
  items: OrderItem[]; // Add an array of OrderItem objects
}

export interface OrderItem {
  productId: string;
  productName: string; // Added when ordered
  options: { [key: string]: any }; // Options as a dynamic key-value pair
  optionsString: string; // Options as a string for displaying
  price: number;
  orderedBy: string;
}
