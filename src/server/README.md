# Server / storage layer

CRUD для товарів реалізовано в `products-storage.ts`. Реалізація вибирається автоматично:

- **Firebase налаштовано** (env: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) → **Firestore**. Працює локально та на Vercel.
- **Firebase не налаштовано** → **локальний JSON** (`data/products.json`). На Vercel запис у файл недоступний (лише читання).

## Підключення Firebase (Firestore)

1. [Firebase Console](https://console.firebase.google.com/) → свій проект (або створити) → Project settings → Service accounts.
2. «Generate new private key» → завантажиться JSON. У ньому: `project_id`, `client_email`, `private_key`.
3. Локально: створити `.env` (скопіювати з `.env.example`) і заповнити:
   - `FIREBASE_PROJECT_ID` = `project_id`
   - `FIREBASE_CLIENT_EMAIL` = `client_email`
   - `FIREBASE_PRIVATE_KEY` = рядок `private_key` (з `\n` всередині лапок).
4. На Vercel: Settings → Environment Variables — додати ті самі три змінні для Production (і за потреби Preview).

Після цього додавання/редагування/видалення товарів на хості працюватиме через Firestore.

## Файли

- `products-storage.ts` — точка входу, вибір Firestore або файлу.
- `products-storage-firebase.ts` — Firestore, колекція `products`.
- `products-storage-file.ts` — локальний JSON.
- `firebase-admin.ts` — ініціалізація Firebase Admin SDK з env.

API routes (`app/api/products/`) не змінюються при перемиканні на Firebase.
