import { redirect } from 'next/navigation';
import { DEFAULT_URL_LOCALE } from '@/shared/config/locale-url';

export default function RootPage() {
  redirect(`/${DEFAULT_URL_LOCALE}`);
}
