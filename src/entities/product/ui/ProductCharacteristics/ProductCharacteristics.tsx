'use client';

import type { Product } from '../../model/types';

export interface ProductCharacteristicsProps {
  product: Product;
  className?: string;
}

export function ProductCharacteristics({ product, className }: ProductCharacteristicsProps) {
  const { description, characteristics } = product;
  const hasCharacteristics = characteristics && Object.keys(characteristics).length > 0;
  const hasDescription = description?.trim();

  if (!hasCharacteristics && !hasDescription) return null;

  return (
    <div className={className}>
      {hasCharacteristics && (
        <section className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-primary">
            Характеристики
          </h3>
          <dl className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50/50">
            {Object.entries(characteristics!).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 sm:flex-nowrap"
              >
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {hasDescription && (
        <section>
          <h3 className="mb-3 text-lg font-semibold text-primary">
            Описание
          </h3>
          <div className="whitespace-pre-line rounded-lg border border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-700">
            {description}
          </div>
        </section>
      )}
    </div>
  );
}
