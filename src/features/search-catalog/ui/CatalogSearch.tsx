'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui';
import { useLocalePath } from '@/app/providers/LocaleProvider';

const DEBOUNCE_MS = 1000;

export interface CatalogSearchProps {
  /** Поточний пошуковий запит (наприклад з URL) */
  defaultValue?: string;
  /** Викликається після дебаунсу (через 2 с після останнього введення) */
  onSearch?: (query: string) => void;
  /** Якщо true, після дебаунсу виконується перехід на сторінку пошуку з query */
  navigateOnDebounce?: boolean;
  className?: string;
  variant?: 'default' | 'dark';
}

export function CatalogSearch({
  defaultValue = '',
  onSearch,
  navigateOnDebounce = true,
  className,
  variant = 'default',
}: CatalogSearchProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const localePath = useLocalePath();
  const [query, setQuery] = useState(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Синхронізувати з defaultValue (наприклад при переході на сторінку пошуку з ?text=)
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  // Дебаунс: через 2 с після останнього введення — запит/перехід (пропускаємо, якщо query вже збігається з URL)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    if (!trimmed) {
      debounceRef.current = null;
      return;
    }
    const defaultTrimmed = defaultValue.trim();
    if (trimmed === defaultTrimmed) {
      debounceRef.current = null;
      return;
    }
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      onSearch?.(trimmed);
      if (navigateOnDebounce) {
        router.push(localePath(`/shop/search?text=${encodeURIComponent(trimmed)}`));
      }
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, defaultValue, onSearch, navigateOnDebounce, localePath, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch?.(trimmed);
      router.push(localePath(`/shop/search?text=${encodeURIComponent(trimmed)}`));
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
