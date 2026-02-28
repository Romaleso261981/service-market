'use client';

import Link from 'next/link';
import { useProducts } from '@/app/providers/ProductsProvider';
import { Button } from '@/shared/ui';

export default function AdminProductsPage() {
  const { products, loading, error, deleteProduct } = useProducts();

  const handleDelete = async (id: string, name: string) => {
    if (typeof window !== 'undefined' && window.confirm(`Видалити «${name}»?`)) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Не вдалося видалити');
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Товари</h1>
        <Link href="/admin/products/new">
          <Button variant="primary">+ Додати товар</Button>
        </Link>
      </div>
      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}
      {loading ? (
        <p className="py-8 text-center text-gray-500">Завантаження...</p>
      ) : (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Код
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Назва
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Ціна
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Наявність
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Дії
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {p.code}
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-900">
                  {p.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {p.price} {p.currency}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {p.inStock ? (
                    <span className="text-green-600">В наявності</span>
                  ) : (
                    <span className="text-amber-600">Під заказ</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="mr-2 text-primary hover:underline"
                  >
                    Редагувати
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.name)}
                    className="text-red-600 hover:underline"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
