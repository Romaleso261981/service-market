# Server / storage layer

Усі операції з товарами йдуть **тільки через Firebase Firestore** (віддалена база).

## Змінні оточення

Потрібні для роботи (локально в `.env` / `.env.local`, на Vercel — Environment Variables):

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (рядок з JSON ключа, з `\n` у лапках)

Без них Firestore не ініціалізується: читання поверне порожні дані, запис викличе помилку.

## Файли

- `products-storage.ts` — точка входу, делегує в Firestore.
- `products-storage-firebase.ts` — реалізація для Firestore, колекція `products`.
- `firebase-admin.ts` — ініціалізація Firebase Admin SDK з env.

API routes (`app/api/products/`) не змінюються.
