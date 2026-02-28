import type { Category } from '@/entities/category';

/** Категорії каталогу (для привʼязки товарів і навігації) */
export const mainCategories: Category[] = [
  { id: 'big', name: 'Для великої техніки', slug: 'big', href: '/catalog/big' },
  { id: 'kitchen', name: 'Для кухонної техніки', slug: 'kitchen', href: '/catalog/kitchen' },
  { id: 'industrial-cold', name: 'Промисловий холод', slug: 'industrial-cold', href: '/catalog/industrial-cold' },
  { id: 'home-body', name: 'До техніки по догляду за домом і тілом', slug: 'home-body', href: '/catalog/home-body' },
  { id: 'heating', name: 'Для опалювальної та водонагрівальної техніки', slug: 'heating', href: '/catalog/heating' },
  { id: 'climate', name: 'Для кліматичної техніки', slug: 'climate', href: '/catalog/climate' },
  { id: 'horeca', name: 'Запчастини HoReCa', slug: 'horeca', href: '/catalog/horeca' },
  { id: 'car-ac', name: 'Для автомобільних кондиціонерів', slug: 'car-ac', href: '/catalog/car-ac' },
  { id: 'chemistry', name: 'Засоби для побутової техніки', slug: 'chemistry', href: '/catalog/chemistry' },
  { id: 'lightning', name: 'Блискавкозахист та заземлення', slug: 'lightning', href: '/catalog/lightning' },
  { id: 'batteries', name: 'Батарейки', slug: 'batteries', href: '/catalog/batteries' },
  { id: 'remotes', name: 'Пульти ДУ', slug: 'remotes', href: '/catalog/remotes' },
  { id: 'ten', name: 'ТЕНИ', slug: 'ten', href: '/catalog/ten' },
  { id: 'universal', name: 'Універсальні запчастини', slug: 'universal', href: '/catalog/universal' },
  { id: 'tools', name: 'Електроінструменти', slug: 'tools', href: '/catalog/tools' },
  { id: 'hot', name: 'Надходження', slug: 'hot', href: '/shop/action_type/show/hot' },
];
