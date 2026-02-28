'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Product } from '@/entities/product';
import * as productsApi from '@/shared/api/products';

type ProductCreate = Omit<Product, 'id'> & { slug?: string };
type ProductUpdate = Partial<Omit<Product, 'id'>>;

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addProduct: (data: ProductCreate) => Promise<Product>;
  updateProduct: (id: string, data: ProductUpdate) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await productsApi.fetchProducts();
      setProducts(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addProduct = useCallback(async (data: ProductCreate) => {
    const product = await productsApi.createProduct(data);
    await refetch();
    return product;
  }, [refetch]);

  const updateProduct = useCallback(
    async (id: string, data: ProductUpdate) => {
      await productsApi.updateProduct(id, data);
      await refetch();
    },
    [refetch]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      await productsApi.deleteProduct(id);
      await refetch();
    },
    [refetch]
  );

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        refetch,
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
