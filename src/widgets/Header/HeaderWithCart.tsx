'use client';

import { Header } from './Header';
import { useCartContext } from '@/app/providers/CartProvider';

/** Header that reads cart count from global context */
export function HeaderWithCart() {
  const { count } = useCartContext();
  return <Header cartCount={count} />;
}
