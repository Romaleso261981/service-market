/**
 * Одноразовий seed: перенести товари з data/products.json у Firestore.
 * POST /api/seed-firestore — викликати один раз, потім цей файл видалити.
 */
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getFirestoreDb, isFirebaseConfigured } from '@/server/firebase-admin';
import type { Product } from '@/entities/product/model/types';

const PRODUCTS_FILE = join(process.cwd(), 'data', 'products.json');

export async function POST() {
  if (!isFirebaseConfigured()) {
    return NextResponse.json(
      { error: 'Firebase not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.' },
      { status: 400 }
    );
  }
  const db = getFirestoreDb();
  if (!db) {
    return NextResponse.json({ error: 'Firebase Admin init failed.' }, { status: 500 });
  }
  try {
    const raw = await readFile(PRODUCTS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    const products: Product[] = Array.isArray(data) ? data : [];
    if (products.length === 0) {
      return NextResponse.json({ message: 'No products in file.', seeded: 0 });
    }
    const stripUndefined = (obj: Record<string, unknown>) => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        if (v !== undefined) out[k] = v;
      }
      return out;
    };
    for (const p of products) {
      const id = p.id || String(Date.now() + Math.random());
      const product = { ...(p as unknown as Record<string, unknown>), id };
      await db.collection('products').doc(id).set(stripUndefined(product));
    }
    return NextResponse.json({
      message: `Seeded ${products.length} products to Firestore.`,
      seeded: products.length,
    });
  } catch (err) {
    console.error('POST /api/seed-firestore', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
