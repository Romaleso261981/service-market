'use client';

import { useParams, notFound } from 'next/navigation';
import { useProducts } from '@/app/providers/ProductsProvider';
import { ProductForm } from '@/features/admin-product-form';
import type { ProductFormData } from '@/features/admin-product-form';

export default function EditProductPage() {
  const params = useParams();
  const id = (params?.id as string) ?? '';
  const { getProductById, updateProduct } = useProducts();
  const product = getProductById(id);

  if (!product) notFound();

  const handleSubmit = (data: ProductFormData) => {
    updateProduct(id, {
      code: data.code,
      name: data.name,
      slug: data.slug,
      price: data.price,
      currency: data.currency,
      inStock: data.inStock,
      deliveryDays: data.deliveryDays || undefined,
      image: data.image || undefined,
    });
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
