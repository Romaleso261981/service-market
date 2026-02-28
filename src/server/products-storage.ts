/**
 * Products storage — тільки Firebase Firestore (віддалена база).
 * Потрібні змінні: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
 */
import * as firebaseStorage from '@/server/products-storage-firebase';

export async function getAllProducts() {
  return firebaseStorage.getAllProducts();
}

export async function getProductById(id: string) {
  return firebaseStorage.getProductById(id);
}

export async function getProductBySlug(slug: string) {
  return firebaseStorage.getProductBySlug(slug);
}

export async function createProduct(
  data: Parameters<typeof firebaseStorage.createProduct>[0]
) {
  return firebaseStorage.createProduct(data);
}

export async function updateProduct(
  id: string,
  data: Parameters<typeof firebaseStorage.updateProduct>[1]
) {
  return firebaseStorage.updateProduct(id, data);
}

export async function deleteProduct(id: string) {
  return firebaseStorage.deleteProduct(id);
}
