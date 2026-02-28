import type { Category } from '@/entities/category';

/** Main catalog categories (from service-market.com.ua) */
export const mainCategories: Category[] = [
  { id: 'big', name: 'Для крупной техники', slug: 'big', href: '/catalog/big' },
  { id: 'kitchen', name: 'Для кухонной техники', slug: 'kitchen', href: '/catalog/kitchen' },
  { id: 'industrial-cold', name: 'Промышленный холод', slug: 'industrial-cold', href: '/catalog/industrial-cold' },
  { id: 'home-body', name: 'К технике по уходу за домом и телом', slug: 'home-body', href: '/catalog/home-body' },
  { id: 'heating', name: 'Для отопительной и водонагревательной техники', slug: 'heating', href: '/catalog/heating' },
  { id: 'climate', name: 'Для климатической техники', slug: 'climate', href: '/catalog/climate' },
  { id: 'horeca', name: 'Запчасти HoReCa', slug: 'horeca', href: '/catalog/horeca' },
  { id: 'car-ac', name: 'Для автомобильных кондиционеров', slug: 'car-ac', href: '/catalog/car-ac' },
  { id: 'chemistry', name: 'Средства для бытовой техники', slug: 'chemistry', href: '/catalog/chemistry' },
  { id: 'lightning', name: 'Молниезащита и заземление', slug: 'lightning', href: '/catalog/lightning' },
  { id: 'batteries', name: 'Батарейки', slug: 'batteries', href: '/catalog/batteries' },
  { id: 'remotes', name: 'Пульты ДУ', slug: 'remotes', href: '/catalog/remotes' },
  { id: 'ten', name: 'ТЭНы', slug: 'ten', href: '/catalog/ten' },
  { id: 'universal', name: 'Универсальные запчасти', slug: 'universal', href: '/catalog/universal' },
  { id: 'tools', name: 'Электроинструменты', slug: 'tools', href: '/catalog/tools' },
  { id: 'hot', name: 'Поступления', slug: 'hot', href: '/shop/action_type/show/hot' },
];
