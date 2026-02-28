'use client';

import Link from 'next/link';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localePath = useLocalePath();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
        <Link
          href={localePath('/admin')}
          className="mb-4 block text-lg font-bold text-gray-900"
        >
          Адмін-панель
        </Link>
        <nav className="space-y-1">
          <Link
            href={localePath('/admin')}
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            Головна
          </Link>
          <Link
            href={localePath('/admin/products')}
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            Товари
          </Link>
          <Link
            href={localePath('/admin/products/new')}
            className="block rounded-lg px-3 py-2 text-primary hover:bg-primary-light"
          >
            + Додати товар
          </Link>
        </nav>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <Link
            href={localePath('/')}
            className="text-sm text-gray-500 hover:text-primary"
          >
            ← На сайт
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
