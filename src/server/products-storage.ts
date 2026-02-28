/**
 * Products storage layer — local JSON file.
 * Replace this module with a DB client (e.g. Prisma, Drizzle) to switch to an external database.
 */
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Product } from '@/entities/product';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readProducts(): Promise<Product[]> {
  await ensureDataDir();
  try {
    const raw = await readFile(PRODUCTS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeProducts(products: Product[]): Promise<void> {
  await ensureDataDir();
  await writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export async function getAllProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function createProduct(
  data: Omit<Product, 'id'> & { slug?: string }
): Promise<Product> {
  const products = await readProducts();
  const id = String(Date.now());
  const slug =
    data.slug?.trim() ||
    data.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '');
  const product: Product = { ...data, id, slug };
  products.push(product);
  await writeProducts(products);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<Product | null> {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  await writeProducts(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await writeProducts(filtered);
  return true;
}
