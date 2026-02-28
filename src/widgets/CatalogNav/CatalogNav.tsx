'use client';

import Link from 'next/link';
import { mainCategories } from '@/shared/config/categories';

export function CatalogNav() {
  return (
    <nav className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-semibold text-gray-900">Каталог</h2>
      <ul className="space-y-1">
        {mainCategories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={cat.href}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-light hover:text-primary"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
