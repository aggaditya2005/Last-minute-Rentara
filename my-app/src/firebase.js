import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxJlTJ6oVg2MThLZvilqmCoPjr8SalVE0",
  authDomain: "rentara-7c82c.firebaseapp.com",
  projectId: "rentara-7c82c",
  storageBucket: "rentara-7c82c.appspot.com", 
  messagingSenderId: "221992490800",
  appId: "1:221992490800:web:ca01a60b32ee846f2b9af5",
  measurementId: "G-0B7FGTZ7V9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
