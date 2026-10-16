import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAd6hj7L69BKk_swkBIm7UUfjRBBsOxPbI",
  authDomain: "jobnest-de4e5.firebaseapp.com",
  projectId: "jobnest-de4e5",
  storageBucket: "jobnest-de4e5.firebasestorage.app",
  messagingSenderId: "926165814049",
  appId: "1:926165814049:web:c28274ded979e1eaaf4c60"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
