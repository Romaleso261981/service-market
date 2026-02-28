'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/cn';
import { useLocale } from '@/app/providers/LocaleProvider';
import { URL_LOCALES, type UrlLocale } from '@/shared/config/locale-url';

const URL_LOCALE_LABELS: Record<UrlLocale, string> = {
  ua: 'UA',
  ru: 'RU',
};

export interface LanguageSwitcherProps {
  variant?: 'default' | 'dark';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const currentUrlLocale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const otherLocales = URL_LOCALES.filter((l) => l !== currentUrlLocale);

  const handleSelect = (urlLocale: UrlLocale) => {
    const base = pathname ?? '';
    const newPath = base.replace(/^\/[^/]+/, `/${urlLocale}`) || `/${urlLocale}`;
    router.push(newPath);
    setOpen(false);
  };

  const isDark = variant === 'dark';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2 py-1.5 font-medium transition-colors',
          isDark
            ? 'text-white hover:bg-white/10'
            : 'text-primary hover:bg-primary-light/50',
          open && (isDark ? 'bg-white/10' : 'bg-primary-light/50')
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('languageSwitcher.ariaLabel')}
      >
        <span>{URL_LOCALE_LABELS[currentUrlLocale]}</span>
        <svg
          className={cn(
            'h-4 w-4 shrink-0 transition-transform',
            isDark ? 'text-white' : 'text-primary',
            open && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute left-0 top-full z-50 mt-1 min-w-[80px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {otherLocales.map((urlLocale) => (
            <li key={urlLocale} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(urlLocale)}
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                {URL_LOCALE_LABELS[urlLocale]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
