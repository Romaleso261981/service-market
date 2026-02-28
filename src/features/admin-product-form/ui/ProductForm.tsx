'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/shared/ui';
import type { Product } from '@/entities/product';

export interface ProductFormProps {
  initial?: Product | null;
  onSubmit: (data: ProductFormData) => void;
  submitLabel: string;
}

export interface ProductFormData {
  code: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  inStock: boolean;
  deliveryDays: string;
  image: string;
}

const defaultData: ProductFormData = {
  code: '',
  name: '',
  slug: '',
  price: 0,
  currency: 'грн',
  inStock: true,
  deliveryDays: '',
  image: '',
};

export function ProductForm({
  initial,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const router = useRouter();
  const [data, setData] = useState<ProductFormData>(
    initial
      ? {
          code: initial.code,
          name: initial.name,
          slug: initial.slug,
          price: initial.price,
          currency: initial.currency,
          inStock: initial.inStock,
          deliveryDays: initial.deliveryDays ?? '',
          image: initial.image ?? '',
        }
      : defaultData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    router.push('/admin/products');
  };

  const update = (field: keyof ProductFormData, value: string | number | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (field === 'name' && !initial) {
      setData((prev) => ({
        ...prev,
        slug: String(value).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, ''),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Код
        </label>
        <Input
          value={data.code}
          onChange={(e) => update('code', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Назва
        </label>
        <Input
          value={data.name}
          onChange={(e) => update('name', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Slug (URL)
        </label>
        <Input
          value={data.slug}
          onChange={(e) => update('slug', e.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Ціна
          </label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={data.price || ''}
            onChange={(e) => update('price', Number(e.target.value) || 0)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Валюта
          </label>
          <Input
            value={data.currency}
            onChange={(e) => update('currency', e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Термін поставки (наприклад: 10–15 днів)
        </label>
        <Input
          value={data.deliveryDays}
          onChange={(e) => update('deliveryDays', e.target.value)}
          placeholder="Порожньо = в наявності"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          URL зображення
        </label>
        <Input
          type="url"
          value={data.image}
          onChange={(e) => update('image', e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={data.inStock}
            onChange={(e) => update('inStock', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">В наявності</span>
        </label>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
