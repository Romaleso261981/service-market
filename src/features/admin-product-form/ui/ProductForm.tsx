'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/shared/ui';
import type { Product } from '@/entities/product';
import { mainCategories } from '@/shared/config/categories';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export type ProductSubmitData = Omit<ProductFormData, 'characteristicsText' | 'description' | 'categoryId'> & {
  description?: string;
  characteristics?: Record<string, string>;
  categoryId?: string;
  image?: string;
  images?: string[];
};

export interface ProductFormProps {
  initial?: Product | null;
  onSubmit: (data: ProductSubmitData) => void;
  submitLabel: string;
}

export interface ProductFormData {
  code: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  currency: string;
  inStock: boolean;
  deliveryDays: string;
  /** Список URL фото */
  images: string[];
  description: string;
  characteristicsText: string;
}

const defaultData: ProductFormData = {
  code: '',
  name: '',
  slug: '',
  categoryId: '',
  price: 0,
  currency: 'грн',
  inStock: true,
  deliveryDays: '',
  images: [],
  description: '',
  characteristicsText: '',
};

function parseCharacteristics(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const colon = line.indexOf(':');
      if (colon > 0) {
        const key = line.slice(0, colon).trim();
        const value = line.slice(colon + 1).trim();
        if (key) out[key] = value;
      }
    });
  return out;
}

function formatCharacteristics(rec: Record<string, string> | undefined): string {
  if (!rec || !Object.keys(rec).length) return '';
  return Object.entries(rec)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

export function ProductForm({
  initial,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const router = useRouter();
  const localePath = useLocalePath();
  const [data, setData] = useState<ProductFormData>(
    initial
      ? {
          ...defaultData,
          code: initial.code,
          name: initial.name,
          slug: initial.slug,
          categoryId: initial.categoryId ?? '',
          price: initial.price,
          currency: initial.currency,
          inStock: initial.inStock,
          deliveryDays: initial.deliveryDays ?? '',
          images:
            initial.images?.length ? [...initial.images] : initial.image ? [initial.image] : [],
          description: initial.description ?? '',
          characteristicsText: formatCharacteristics(initial.characteristics),
        }
      : defaultData
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const characteristics = parseCharacteristics(data.characteristicsText);
    const imageList = data.images.filter((u) => u.trim());
    const payload: ProductSubmitData = {
      code: data.code,
      name: data.name,
      slug: data.slug,
      categoryId: data.categoryId || undefined,
      price: data.price,
      currency: data.currency,
      inStock: data.inStock,
      deliveryDays: data.deliveryDays,
      images: imageList,
      image: imageList[0],
      description: data.description || undefined,
      characteristics: Object.keys(characteristics).length > 0 ? characteristics : undefined,
    };
    await Promise.resolve(onSubmit(payload));
    router.push(localePath('/admin/products'));
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
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Каталог (категорія)
        </label>
        <select
          value={data.categoryId}
          onChange={(e) => update('categoryId', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">— не обрано —</option>
          {mainCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
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
          Фото (URL)
        </label>
        <div className="space-y-2">
          {(data.images.length ? data.images : ['']).map((url, i) => (
            <div key={i} className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => {
                  const next = [...(data.images.length ? data.images : [''])];
                  next[i] = e.target.value;
                  setData((prev) => ({ ...prev, images: next }));
                }}
                placeholder="https://..."
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  const next = (data.images.length ? data.images : ['']).filter((_, idx) => idx !== i);
                  setData((prev) => ({ ...prev, images: next }));
                }}
                className="shrink-0 rounded border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData((prev) => ({ ...prev, images: [...(prev.images.length ? prev.images : []), ''] }))}
            className="rounded border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            + Додати фото
          </button>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Опис
        </label>
        <textarea
          value={data.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Текстовий опис товару..."
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Характеристики
        </label>
        <textarea
          value={data.characteristicsText}
          onChange={(e) => update('characteristicsText', e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder={'Производитель: Bosch\nБренд: Bosch, Siemens\nЦвет: белый\nТип стержня: пластиковый'}
        />
        <p className="mt-1 text-xs text-gray-500">
          Кожен рядок у форматі «Назва: значення»
        </p>
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
          onClick={() => router.push(localePath('/admin/products'))}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
