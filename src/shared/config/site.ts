/**
 * Site-wide config (name, contacts, nav).
 * Reference: https://www.service-market.com.ua/
 */
export const siteConfig = {
  name: 'СЕРВИС-МАРКЕТ',
  tagline: 'Запчасти для бытовой техники',
  phone: '0 (800) 752 110',
  phones: ['(067) 468 33 55', '(093) 468 33 55', '(050) 468 33 55'],
  schedule: 'Пн - Пт: 9:00 - 20:00, Сб - Вс: 10:00 - 16:00',
  searchPlaceholder: 'Например, Bosch 00657428 или Samsung WF0702WKQ',
  partPicker: {
    brandPlaceholder: 'Выберите бренд',
    modelPlaceholder: 'Выберите модель',
    findPartLabel: 'Найти деталь',
  },
} as const;
