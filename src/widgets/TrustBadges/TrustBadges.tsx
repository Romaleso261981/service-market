'use client';

import { useTranslation } from 'react-i18next';

const badgeKeys = [
  { titleKey: 'home.trust1Title', valueKey: 'home.trust1Value' },
  { titleKey: 'home.trust2Title', valueKey: 'home.trust2Value' },
  { titleKey: 'home.trust3Title', valueKey: 'home.trust3Value' },
  { titleKey: 'home.trust4Title', valueKey: 'home.trust4Value' },
];

export function TrustBadges() {
  const { t } = useTranslation();

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-center font-semibold text-gray-900">
        {t('home.trustTitle')}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badgeKeys.map((b) => (
          <div key={b.titleKey} className="text-center">
            <p className="font-medium text-gray-900">{t(b.titleKey)}</p>
            {t(b.valueKey) && (
              <p className="mt-1 text-sm text-primary">{t(b.valueKey)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
