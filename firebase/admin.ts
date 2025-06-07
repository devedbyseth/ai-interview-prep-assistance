import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

if (!apps.length) {
  const app = initializeApp({
    credential: cert({
      projectId: process.env.PROJECT_KEY_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
  });
}

export default { db: getFirestore(), auth: getAuth() };
