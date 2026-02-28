'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export interface CatalogSearchProps {
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
  /** Dark header: white rounded search bar with purple icon */
  variant?: 'default' | 'dark';
}

export function CatalogSearch({
  defaultValue = '',
  onSearch,
  className,
  variant = 'default',
}: CatalogSearchProps) {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    if (query.trim()) {
      window.location.href = localePath(`/shop/search?text=${encodeURIComponent(query.trim())}`);
    }
  };

  const isDark = variant === 'dark';

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <div className={isDark ? 'relative flex-1' : ''}>
          <Input
            type="search"
            placeholder={t('header.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              'flex-1',
              isDark && 'rounded-full border-0 bg-white py-2.5 pl-4 pr-10 text-gray-900'
            )}
            aria-label={t('search.title')}
          />
          {isDark && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-header">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          )}
        </div>
        {!isDark && (
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {t('header.find')}
          </button>
        )}
      </div>
    </form>
  );
}
