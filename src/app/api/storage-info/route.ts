import { NextResponse } from 'next/server';
import { getAllProducts } from '@/server/products-storage';

/**
 * GET /api/storage-info — кількість товарів у Firestore.
 */
export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({
      storage: 'firebase',
      productsCount: products.length,
      message: 'Products are stored in Firebase Firestore.',
    });
  } catch (err) {
    console.error('GET /api/storage-info', err);
    return NextResponse.json(
      { error: 'Failed to get storage info' },
      { status: 500 }
    );
  }
}
