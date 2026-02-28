import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/shared/config/site';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    'Запчасти для бытовой техники в Украине. Стиральные машины, холодильники, пылесосы, кухонная техника. Большой ассортимент, доставка.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
