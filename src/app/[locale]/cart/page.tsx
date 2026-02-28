'use client';

import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { useCartContext } from '@/app/providers/CartProvider';

export default function CartPage() {
  const { t } = useTranslation();
  const { items, total, count } = useCartContext();

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-bold">{t('header.cart')}</h1>
          {count === 0 ? (
            <p className="text-gray-500">{t('cart.empty')}</p>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex justify-between rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{t('product.code')}: {item.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {item.price * item.quantity} грн
                      </p>
                      <p className="text-sm text-gray-500">× {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xl font-semibold">
                {t('cart.total')}: {total} грн
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
