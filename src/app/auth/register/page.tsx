import Link from 'next/link';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">Регистрация</h1>
          <p className="mt-2 text-gray-600">Страница регистрации (в разработке).</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            ← На главную
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
