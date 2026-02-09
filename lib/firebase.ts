import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC9m8n2sXo5l3a1b2c3d4e5f6g7h8i9j0",
  authDomain: "kiosk-app.firebaseapp.com",
  projectId: "kiosk-app",
  storageBucket: "kiosk-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
});
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
