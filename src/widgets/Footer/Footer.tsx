'use client';

import Link from 'next/link';
import { siteConfig } from '@/shared/config/site';
import { mainCategories } from '@/shared/config/categories';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-gray-900">{siteConfig.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{siteConfig.tagline}</p>
            <p className="mt-2 text-sm text-gray-600">{siteConfig.schedule}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Контакты</h3>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="mt-2 block text-primary hover:underline"
            >
              {siteConfig.phone}
            </a>
            <p className="text-xs text-gray-500">
              бесплатно с мобильного по всей Украине
            </p>
            <div className="mt-1 flex flex-wrap gap-2 text-sm">
              {siteConfig.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s|\(|\)/g, '')}`} className="text-gray-600 hover:text-primary">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Каталог</h3>
            <ul className="mt-2 space-y-1">
              {mainCategories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Помощь</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/delivery" className="hover:text-primary">Доставка и оплата</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary">Обмен и возврат</Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-primary">Проверить статус заказа</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
