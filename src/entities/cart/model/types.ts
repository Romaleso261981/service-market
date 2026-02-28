export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  code: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}
