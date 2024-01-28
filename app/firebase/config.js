
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKSJwglAYTS4GIomwceFE_ZzKLFt0GA3A",
  authDomain: "bg-remover-ai.firebaseapp.com",
  projectId: "bg-remover-ai",
  storageBucket: "bg-remover-ai.appspot.com",
  messagingSenderId: "433790160309",
  appId: "1:433790160309:web:8a390b529308afec275dfc",
  measurementId: "G-LTZPR1ERM7",
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(firebaseApp);