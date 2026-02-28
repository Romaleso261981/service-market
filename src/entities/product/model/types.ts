export interface Product {
  id: string;
  code: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  /** Один URL (залишено для сумісності), головне фото */
  image?: string;
  /** Список URL фото — якщо є, використовується замість image */
  images?: string[];
  inStock: boolean;
  deliveryDays?: string;
  brand?: string;
  categoryId?: string;
  description?: string;
  characteristics?: Record<string, string>;
}

export type ProductCardData = Pick<
  Product,
  | 'id'
  | 'code'
  | 'name'
  | 'slug'
  | 'price'
  | 'currency'
  | 'image'
  | 'images'
  | 'inStock'
  | 'deliveryDays'
  | 'description'
  | 'characteristics'
  | 'brand'
>;

/** Повертає масив URL фото товару (images або [image] для старих записів) */
export function getProductImages(product: Pick<Product, 'image' | 'images'>): string[] {
  if (product.images?.length) return product.images;
  if (product.image) return [product.image];
  return [];
}
