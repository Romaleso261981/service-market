'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui';

export interface CatalogSearchProps {
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function CatalogSearch({
  defaultValue = '',
  onSearch,
  className,
}: CatalogSearchProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    if (query.trim()) {
      window.location.href = `/shop/search?text=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder={t('header.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          aria-label={t('search.title')}
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {t('header.find')}
        </button>
      </div>
    </form>
  );
}
