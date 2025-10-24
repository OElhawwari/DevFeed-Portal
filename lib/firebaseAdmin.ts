import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let db: Firestore | null = null;


const hasFirebaseConfig = () => {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
};


const initializeFirebaseAdmin = () => {
  if (!hasFirebaseConfig()) {
    return null;
  }

  try {
    
    const existingApps = getApps();
    if (existingApps.length > 0) {
      return getFirestore();
    }

    
    const projectId = process.env.FIREBASE_PROJECT_ID!;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
    
    const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    return getFirestore();
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
    return null;
  }
};

// Initialize lazily when needed


export const getAdminDb = () => {
  
  if (!db && hasFirebaseConfig()) {
    db = initializeFirebaseAdmin();
  }
  return db;
};


export const adminDb = db;
export const isFirebaseConfigured = () => {
  const currentDb = getAdminDb();
  return currentDb !== null;
};
