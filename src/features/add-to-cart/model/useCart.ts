'use client';

import { useState, useCallback } from 'react';
import type { CartItem } from '@/entities/cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> | CartItem) => {
    setItems((prev) => {
      const qty = 'quantity' in item ? item.quantity : 1;
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, total, count };
}
