/**
 * Products storage — локальний JSON файл.
 * Використовується, коли Firebase не налаштований.
 */
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Product } from '@/entities/product';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');

export const READONLY_FS_CODE = 'READONLY_FS';

function ensureWritable() {
  if (process.env.VERCEL === '1') {
    const err = new Error(
      'На Vercel зміни товарів недоступні: файлова система лише для читання. Налаштуйте Firebase (env) або редагуйте товари локально.'
    ) as Error & { code: string };
    err.code = READONLY_FS_CODE;
    throw err;
  }
}

async function ensureDataDir() {
  if (process.env.VERCEL === '1') return;
  await mkdir(DATA_DIR, { recursive: true });
}

async function readProducts(): Promise<Product[]> {
  if (process.env.VERCEL === '1') {
    try {
      const raw = await readFile(PRODUCTS_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
      throw err;
    }
  }
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
  ensureWritable();
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
