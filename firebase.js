// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw-pqx4GoKg9TQLv2ZgDPHFcsqUF4TBDI",
  authDomain: "your-survey.firebaseapp.com",
  projectId: "your-survey",
  storageBucket: "your-survey.firebasestorage.app",
  messagingSenderId: "588941965556",
  appId: "1:588941965556:web:ff5cd4e6e083c0023f86a1",
  measurementId: "G-YTE5KZ00N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);