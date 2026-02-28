'use client';

import { CartProvider } from './CartProvider';
import { I18nProvider } from './I18nProvider';
import { ProductsProvider } from './ProductsProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </I18nProvider>
  );
}
