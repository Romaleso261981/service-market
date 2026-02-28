'use client';

import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { siteConfig } from '@/shared/config/site';

export interface PartPickerProps {
  brands?: { id: string; name: string }[];
  onFindPart?: (brandId: string, model: string) => void;
  className?: string;
}

export function PartPicker({
  brands = [],
  onFindPart,
  className,
}: PartPickerProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFindPart?.(brand, model);
    if (brand && model) {
      window.location.href = `/models?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-900">Подбор детали</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              {siteConfig.partPicker.brandPlaceholder}
            </label>
            {brands.length > 0 ? (
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">{siteConfig.partPicker.brandPlaceholder}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                placeholder="Бренд"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              {siteConfig.partPicker.modelPlaceholder}
            </label>
            <Input
              placeholder="Модель"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            {siteConfig.partPicker.findPartLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
