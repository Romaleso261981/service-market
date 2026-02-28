'use client';

const badges = [
  { title: 'Ведущий опыт', value: '14 лет на рынке' },
  { title: 'Наибольший в Украине ассортимент запчастей', value: '' },
  { title: 'Собственные магазины', value: 'Киев, Одесса, Харьков' },
  { title: 'Реальные отзывы', value: '15 929 отзывов' },
];

export function TrustBadges() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-center font-semibold text-gray-900">
        Нам следует доверять
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => (
          <div key={b.title} className="text-center">
            <p className="font-medium text-gray-900">{b.title}</p>
            {b.value && (
              <p className="mt-1 text-sm text-primary">{b.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
