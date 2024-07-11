// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpd4ogEG3F79YMSuvZDunuOKAnEFJ0XN8",
    authDomain: "juridex-5d937.firebaseapp.com",
    projectId: "juridex-5d937",
    storageBucket: "juridex-5d937.appspot.com",
    messagingSenderId: "382687835528",
    appId: "1:382687835528:web:1c770f4f4bc066c670f63d",
    measurementId: "G-EBR9FP39XW"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);