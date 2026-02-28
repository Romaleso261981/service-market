'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product } from '@/entities/product';
import { mockProducts } from '@/shared/config/mock-products';

type ProductCreate = Omit<Product, 'id'> & { slug?: string };
type ProductUpdate = Partial<Omit<Product, 'id'>>;

interface ProductsContextValue {
  products: Product[];
  addProduct: (data: ProductCreate) => Product;
  updateProduct: (id: string, data: ProductUpdate) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

function toProduct(card: (typeof mockProducts)[0]): Product {
  return {
    ...card,
    inStock: card.inStock ?? true,
    brand: undefined,
    categoryId: undefined,
  };
}

const initialProducts: Product[] = mockProducts.map(toProduct);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((data: ProductCreate) => {
    const id = String(Date.now());
    const slug =
      data.slug?.trim() ||
      data.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/gi, '');
    const product: Product = { ...data, id, slug };
    setProducts((prev) => [...prev, product]);
    return product;
  }, []);

  const updateProduct = useCallback((id: string, data: ProductUpdate) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
