/**
 * Products storage — Firebase Firestore.
 * Використовується, коли задані FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
 */
import { getFirestoreDb } from '@/server/firebase-admin';
import type { Product } from '@/entities/product';

const COLLECTION = 'products';

export async function getAllProducts(): Promise<Product[]> {
  const db = getFirestoreDb();
  if (!db) return [];
  const snap = await db.collection(COLLECTION).get();
  const products = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  products.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  const snap = await db.collection(COLLECTION).where('slug', '==', slug).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Product;
}

export async function createProduct(
  data: Omit<Product, 'id'> & { slug?: string }
): Promise<Product> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const id = String(Date.now());
  const slug =
    data.slug?.trim() ||
    data.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '');
  const product: Product = { ...data, id, slug };
  await db.collection(COLLECTION).doc(id).set(product);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  const current = { id: doc.id, ...doc.data() } as Product;
  const updated = { ...current, ...data };
  await ref.set(updated);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}
