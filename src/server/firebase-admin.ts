/**
 * Firebase Admin SDK — ініціалізація для сервера (API routes).
 * Потрібні змінні оточення: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
 */
import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | null = null;

function getFirebaseApp(): App | null {
  if (app) return app;
  if (getApps().length > 0) {
    app = getApps()[0] as App;
    return app;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) return null;
  try {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    return app;
  } catch (err) {
    console.error('Firebase Admin init error:', err);
    return null;
  }
}

export function getFirestoreDb() {
  const application = getFirebaseApp();
  if (!application) return null;
  return getFirestore(application);
}

export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}
