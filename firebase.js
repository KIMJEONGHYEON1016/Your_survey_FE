// src/libs/firebase.js

import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAw-pqx4GoKg9TQLv2ZgDPHFcsqUF4TBDI",
  authDomain: "your-survey.firebaseapp.com",
  projectId: "your-survey",
  storageBucket: "your-survey.firebasestorage.app",
  messagingSenderId: "588941965556",
  appId: "1:588941965556:web:ff5cd4e6e083c0023f86a1",
  measurementId: "G-YTE5KZ00N6"
};

// ✅ SSR 환경 방지
let analytics;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);

  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('✅ Firebase Analytics initialized');
    } else {
      console.warn('⚠️ Firebase Analytics not supported in this environment');
    }
  });
}

export {};
