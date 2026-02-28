'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { Button } from '@/shared/ui';
import { ProductCharacteristics, getProductImages } from '@/entities/product';
import { useProducts } from '@/app/providers/ProductsProvider';
import { useCartContext } from '@/app/providers/CartProvider';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const localePath = useLocalePath();
  const { t } = useTranslation();
  const { products } = useProducts();
  const { addItem } = useCartContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.slug === slug);
  const images = product ? getProductImages(product) : [];

  if (!slug || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <HeaderWithCart />
        <main className="flex-1 px-4 py-12 text-center">
          <p className="text-gray-500">Товар не знайдено.</p>
          <Link href={localePath('/')} className="mt-4 inline-block text-primary hover:underline">
            На головну
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      code: product.code,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link href={localePath('/')} className="mb-4 inline-block text-sm text-gray-500 hover:text-primary">
            ← На головну
          </Link>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              {images.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={images[selectedImageIndex] ?? images[0]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {images.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedImageIndex(i)}
                          className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 ${
                            selectedImageIndex === i
                              ? 'border-primary'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={url}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  {t('product.noPhoto')}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('product.code')}: {product.code}</p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">{product.name}</h1>
              {product.deliveryDays && (
                <p className="mt-2 text-sm text-amber-600">{product.deliveryDays}</p>
              )}
              <p className="mt-4 text-2xl font-semibold text-primary">
                {product.price} {product.currency}
              </p>
              <Button
                variant="primary"
                className="mt-4"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {product.inStock ? t('product.buy') : t('product.onOrder')}
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <ProductCharacteristics product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
