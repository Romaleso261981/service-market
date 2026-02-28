'use client';

import { CartProvider } from './CartProvider';
import { ProductsProvider } from './ProductsProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <CartProvider>{children}</CartProvider>
    </ProductsProvider>
  );
}
