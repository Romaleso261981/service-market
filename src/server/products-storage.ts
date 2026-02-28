/**
 * Products storage — вибір реалізації:
 * - Якщо задані FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY → Firestore.
 * - Інакше → локальний JSON (data/products.json). На Vercel запис у файл недоступний.
 */
import { isFirebaseConfigured } from '@/server/firebase-admin';
import * as firebaseStorage from '@/server/products-storage-firebase';
import * as fileStorage from '@/server/products-storage-file';

export { READONLY_FS_CODE } from '@/server/products-storage-file';

function storage() {
  return isFirebaseConfigured() ? firebaseStorage : fileStorage;
}

export async function getAllProducts() {
  return storage().getAllProducts();
}

export async function getProductById(id: string) {
  return storage().getProductById(id);
}

export async function getProductBySlug(slug: string) {
  return storage().getProductBySlug(slug);
}

export async function createProduct(
  data: Parameters<typeof firebaseStorage.createProduct>[0]
) {
  return storage().createProduct(data);
}

export async function updateProduct(
  id: string,
  data: Parameters<typeof firebaseStorage.updateProduct>[1]
) {
  return storage().updateProduct(id, data);
}

export async function deleteProduct(id: string) {
  return storage().deleteProduct(id);
}
