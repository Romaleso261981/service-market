# Server / storage layer

CRUD for products is implemented in `products-storage.ts`. **Currently it uses a local JSON file** (`data/products.json`).

## Switching to an external database

1. Replace the implementation of `products-storage.ts` (or add a new file, e.g. `products-storage-db.ts`) with calls to your DB client (Prisma, Drizzle, MongoDB, etc.).
2. Keep the same function signatures:
   - `getAllProducts(): Promise<Product[]>`
   - `getProductById(id): Promise<Product | null>`
   - `getProductBySlug(slug): Promise<Product | null>`
   - `createProduct(data): Promise<Product>`
   - `updateProduct(id, data): Promise<Product | null>`
   - `deleteProduct(id): Promise<boolean>`
3. API routes in `app/api/products/` do not need to change; they only depend on this storage module.

No changes are required in the client (`shared/api/products.ts`, `ProductsProvider`, or admin pages) when you switch the backend.
