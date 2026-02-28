'use client';

import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CatalogNav } from '@/widgets/CatalogNav';
import { PartFinder } from '@/widgets/PartFinder';
import { TrustBadges } from '@/widgets/TrustBadges';
import { ProductGrid } from '@/widgets/ProductGrid';
import { mockProducts } from '@/shared/config/mock-products';
import { useCartContext } from '@/app/providers/CartProvider';

export function HomePage() {
  const { addItem } = useCartContext();

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        code: product.code,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-6">
              <CatalogNav />
            </aside>
            <div className="space-y-8">
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <PartFinder />
              </section>
              <section>
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                  «Сервис-Маркет» — новая жизнь вашей техники
                </h1>
                <p className="text-gray-600">
                  Запчасти для бытовой техники: стиральные и посудомоечные машины,
                  холодильники, бойлеры, вытяжки, пылесосы, мясорубки,
                  микроволновки и многое другое. Более 50 тысяч наименований на
                  складе.
                </p>
              </section>
              <TrustBadges />
              <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Товары, которые часто ищут
                </h2>
                <ProductGrid
                  products={mockProducts}
                  onAddToCart={handleAddToCart}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
