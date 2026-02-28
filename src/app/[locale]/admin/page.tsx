'use client';

import Link from 'next/link';
import { useProducts } from '@/app/providers/ProductsProvider';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export default function AdminDashboardPage() {
  const { products } = useProducts();
  const localePath = useLocalePath();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Адмін-панель</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href={localePath('/admin/products')}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="font-semibold text-gray-900">Товари</h2>
          <p className="mt-1 text-2xl font-bold text-primary">{products.length}</p>
          <p className="mt-1 text-sm text-gray-500">Редагувати, додати, видалити</p>
        </Link>
      </div>
    </div>
  );
}
