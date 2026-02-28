'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useProducts } from '@/app/providers/ProductsProvider';
import { ProductForm } from '@/features/admin-product-form';
import type { ProductSubmitData } from '@/features/admin-product-form';

export default function EditProductPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const { getProductById, updateProduct } = useProducts();
  const product = id ? getProductById(id) : undefined;

  if (!id || !product) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-xl font-bold text-gray-900">
          Товар не знайдено
        </h1>
        <p className="mb-4 text-gray-600">
          Товар з таким ID не існує або був видалений.
        </p>
        <Link
          href="/admin/products"
          className="inline-block text-primary hover:underline"
        >
          ← Повернутися до списку товарів
        </Link>
      </div>
    );
  }

  const handleSubmit = async (data: ProductSubmitData) => {
    try {
      await updateProduct(id, {
        code: data.code,
        name: data.name,
        slug: data.slug,
        price: data.price,
        currency: data.currency,
        inStock: data.inStock,
        deliveryDays: data.deliveryDays || undefined,
        image: data.image || undefined,
        description: data.description,
        characteristics: data.characteristics,
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Не вдалося зберегти');
      throw err;
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Редагувати товар
      </h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm
          initial={product}
          onSubmit={handleSubmit}
          submitLabel="Зберегти зміни"
        />
      </div>
    </div>
  );
}
