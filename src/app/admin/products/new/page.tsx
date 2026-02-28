'use client';

import { useProducts } from '@/app/providers/ProductsProvider';
import { ProductForm } from '@/features/admin-product-form';
import type { ProductSubmitData } from '@/features/admin-product-form';

export default function NewProductPage() {
  const { addProduct } = useProducts();

  const handleSubmit = (data: ProductSubmitData) => {
    addProduct({
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
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Додати товар</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm
          onSubmit={handleSubmit}
          submitLabel="Зберегти товар"
        />
      </div>
    </div>
  );
}
