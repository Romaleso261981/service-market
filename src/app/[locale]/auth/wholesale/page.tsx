'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { useLocalePath } from '@/app/providers/LocaleProvider';

export default function WholesaleLoginPage() {
  const { t } = useTranslation();
  const localePath = useLocalePath();

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('authPages.wholesaleTitle')}</h1>
          <p className="mt-2 text-gray-600">{t('authPages.wholesaleNote')}</p>
          <Link href={localePath('/')} className="mt-4 inline-block text-primary hover:underline">
            {t('authPages.backHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
