/**
 * Products storage — Firebase Firestore.
 * Використовується, коли задані FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
 */
import { getFirestoreDb } from '@/server/firebase-admin';
import type { Product } from '@/entities/product';

const COLLECTION = 'products';

/** Firestore не приймає undefined — прибираємо такі поля. */
function withoutUndefined<T extends Record<string, unknown>>(
  sourceObject: T
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(sourceObject)) {
    if (value !== undefined) result[key] = value;
  }
  return result;
}

export async function getAllProducts(): Promise<Product[]> {
  const db = getFirestoreDb();
  if (!db) return [];
  const snapshot = await db.collection(COLLECTION).get();
  const products = snapshot.docs.map((documentSnapshot) => ({
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  } as Product));
  products.sort((productA, productB) =>
    productA.id.localeCompare(productB.id, 'en', { numeric: true })
  );
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  const documentSnapshot = await db.collection(COLLECTION).doc(id).get();
  if (!documentSnapshot.exists) return null;
  return { id: documentSnapshot.id, ...documentSnapshot.data() } as Product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  const snapshot = await db.collection(COLLECTION).where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  const documentSnapshot = snapshot.docs[0];
  return { id: documentSnapshot.id, ...documentSnapshot.data() } as Product;
}

export async function createProduct(
  productData: Omit<Product, 'id'> & { slug?: string }
): Promise<Product> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const id = String(Date.now());
  const slug =
    productData.slug?.trim() ||
    productData.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '');
  const product: Product = { ...productData, id, slug };
  await db
    .collection(COLLECTION)
    .doc(id)
    .set(withoutUndefined(product as unknown as Record<string, unknown>));
  return product;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id'>>
): Promise<Product | null> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const docRef = db.collection(COLLECTION).doc(id);
  const documentSnapshot = await docRef.get();
  if (!documentSnapshot.exists) return null;
  const currentProduct = { id: documentSnapshot.id, ...documentSnapshot.data() } as Product;
  const updatedProduct = { ...currentProduct, ...updates };
  await docRef.set(
    withoutUndefined(updatedProduct as unknown as Record<string, unknown>)
  );
  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (!db) throw new Error('Firebase not configured');
  const docRef = db.collection(COLLECTION).doc(id);
  const documentSnapshot = await docRef.get();
  if (!documentSnapshot.exists) return false;
  await docRef.delete();
  return true;
}
