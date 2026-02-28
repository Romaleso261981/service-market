import { NextResponse } from 'next/server';
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from '@/server/products-storage';
import type { Product } from '@/entities/product';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error('GET /api/products/[id]', err);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<Omit<Product, 'id'>>;
    const product = await updateProduct(id, body);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error('PUT /api/products/[id]', err);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const deleted = await deleteProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error('DELETE /api/products/[id]', err);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
