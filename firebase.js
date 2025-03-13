// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "PRIVATEKEY",
  authDomain: "sellify-e948b.firebaseapp.com",
  projectId: "sellify-e948b",
  storageBucket: "sellify-e948b.firebasestorage.app",
  messagingSenderId: "456874576264",
  appId: "1:456874576264:web:df75e1111adbbb5258523d",
  measurementId: "G-YZ8GNN4E4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


