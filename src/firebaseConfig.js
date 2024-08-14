// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKLFNxZB5oJFiKxUAAxq5uh3Xmnw9EHRY",
  authDomain: "react-auth-2024-36ace.firebaseapp.com",
  projectId: "react-auth-2024-36ace",
  storageBucket: "react-auth-2024-36ace.appspot.com",
  messagingSenderId: "467411677326",
  appId: "1:467411677326:web:d7612cf5ec9fe1035519df",
  measurementId: "G-9JZ3KC3226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
