export interface Category {
  id: string;
  name: string;
  slug: string;
  href: string;
  children?: Category[];
}
