import { NextResponse } from 'next/server';
import {
  getAllProducts,
  createProduct,
} from '@/server/products-storage';
import type { Product } from '@/entities/product';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error('GET /api/products', err);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Product, 'id'> & { slug?: string };
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error('POST /api/products', err);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
