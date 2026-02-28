export interface Product {
  id: string;
  code: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image?: string;
  inStock: boolean;
  deliveryDays?: string;
  brand?: string;
  categoryId?: string;
}

export type ProductCardData = Pick<
  Product,
  'id' | 'code' | 'name' | 'slug' | 'price' | 'currency' | 'image' | 'inStock' | 'deliveryDays'
>;
