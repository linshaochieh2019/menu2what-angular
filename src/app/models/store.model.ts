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
  size: string;
}

export interface Option {
  optionName: string;
  optionValue: string[];
}

// a dummy store object for testing
export const dummyStores: Store[] = [
  {
    storeId: '1',
    storeName: '幸福堂',
    menu: [
      {
        productId: '101',
        productName: '珍珠奶茶',
        description: '經典的珍珠奶茶，Q彈珍珠搭配香醇奶茶',
        imageUrl: 'https://example.com/pearl_milk_tea.jpg',
        priceSetting: [
          {
            conditions: [
              {
                size: '中',
              },
            ],
            price: 50,
          },
          {
            conditions: [
              {
                size: '大',
              },
            ],
            price: 60,
          },
        ],
        options: [
          {
            optionName: 'size',
            optionValue: ['中', '大'],
          },
          {
            optionName: 'ice',
            optionValue: ['正常冰', '少冰', '去冰'],
          },
          {
            optionName: 'sugar',
            optionValue: ['正常糖', '半糖', '少糖', '無糖'],
          },
        ],
      },
      {
        productId: '102',
        productName: '芋圓奶茶',
        description: '香甜芋圓與奶茶的絕配',
        imageUrl: 'https://example.com/taro_milk_tea.jpg',
        priceSetting: [
          {
            conditions: [
              {
                size: '中',
              },
            ],
            price: 55,
          },
          {
            conditions: [
              {
                size: '大',
              },
            ],
            price: 65,
          },
        ],
        options: [
          {
            optionName: 'size',
            optionValue: ['中', '大'],
          },
          {
            optionName: 'ice',
            optionValue: ['正常冰', '少冰', '去冰'],
          },
          {
            optionName: 'sugar',
            optionValue: ['正常糖', '半糖', '少糖', '無糖'],
          },
        ],
      },
    ],
  },
];
