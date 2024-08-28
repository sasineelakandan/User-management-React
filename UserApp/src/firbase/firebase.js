import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD1z6B26tRRuK4ECvPgk4MN11hBqdS-M_g",
    authDomain: "user-management-2ba93.firebaseapp.com",
    projectId: "user-management-2ba93",
    storageBucket: "user-management-2ba93.appspot.com",
    messagingSenderId: "269381049812",
    appId: "1:269381049812:web:16784dffb89c1fa48d4a41",
    measurementId: "G-5F0FCTT7RJ"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);