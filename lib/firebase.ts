import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUW9nLH478SaJYK5tiQ9lfs1SowMGPVIs",
  authDomain: "bunspos.firebaseapp.com",
  projectId: "bunspos",
  storageBucket: "bunspos.firebasestorage.app",
  messagingSenderId: "593049973722",
  appId: "1:593049973722:web:25887470ce1e05d572c6e3",
  measurementId: "G-JRQ1D4J147",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
