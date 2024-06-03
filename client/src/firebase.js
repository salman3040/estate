// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-351ca.firebaseapp.com',
  projectId: 'mern-estate-351ca',
  storageBucket: 'mern-estate-351ca.appspot.com',
  messagingSenderId: '482713132194',
  appId: '1:482713132194:web:e0e2522a2167470dcb4bfb',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
