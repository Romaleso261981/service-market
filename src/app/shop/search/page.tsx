'use client';

import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CatalogSearch } from '@/features/search-catalog';
import { ProductGrid } from '@/widgets/ProductGrid';
import { useProducts } from '@/app/providers/ProductsProvider';
import { useCartContext } from '@/app/providers/CartProvider';

export default function SearchPage() {
  const { t } = useTranslation();
  const { products } = useProducts();
  const { addItem } = useCartContext();

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
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
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-xl font-semibold">{t('search.title')}</h1>
          <CatalogSearch className="mb-6 max-w-xl" />
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
