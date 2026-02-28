/**
 * Products API client. All CRUD goes through these functions.
 * Backend is currently local JSON (see server/products-storage.ts); switch to DB by changing the storage layer.
 */
import type { Product } from '@/entities/product';

const BASE = '/api/products';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function createProduct(
  data: Omit<Product, 'id'> & { slug?: string }
): Promise<Product> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? 'Failed to create product');
  }
  return res.json();
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<Product> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (res.status === 404) throw new Error('Product not found');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? 'Failed to update product');
  }
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (res.status === 404) throw new Error('Product not found');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? 'Failed to delete product');
  }
}
