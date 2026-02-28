'use client';

import { PartPicker } from '@/features/part-picker';

const mockBrands = [
  { id: 'bosch', name: 'Bosch' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'electrolux', name: 'Electrolux' },
  { id: 'whirlpool', name: 'Whirlpool' },
  { id: 'lg', name: 'LG' },
  { id: 'gorenje', name: 'Gorenje' },
  { id: 'beko', name: 'Beko' },
  { id: 'ariston', name: 'Ariston' },
];

export function PartFinder() {
  return (
    <section className="rounded-xl border border-gray-200 bg-primary-light/30 p-4">
      <PartPicker brands={mockBrands} />
    </section>
  );
}
