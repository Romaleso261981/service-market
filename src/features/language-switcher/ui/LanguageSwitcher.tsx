'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/cn';
import {
  localeLabels,
  supportedLngs,
  getStoredLanguage,
  setStoredLanguage,
  type Locale,
} from '@/shared/lib/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
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

  const currentLng = (i18n.language || getStoredLanguage()) as Locale;
  const otherLngs = supportedLngs.filter((l) => l !== currentLng);

  const handleSelect = (lng: Locale) => {
    i18n.changeLanguage(lng);
    setStoredLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2 py-1.5 font-medium text-primary transition-colors hover:bg-primary-light/50',
          open && 'bg-primary-light/50'
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Оберіть мову"
      >
        <span>{localeLabels[currentLng]}</span>
        <svg
          className={cn('h-4 w-4 text-primary transition-transform', open && 'rotate-180')}
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
          {otherLngs.map((lng) => (
            <li key={lng} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(lng)}
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                {localeLabels[lng]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
