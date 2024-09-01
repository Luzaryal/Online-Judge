// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "algo-mern-oj.firebaseapp.com",
  projectId: "algo-mern-oj",
  storageBucket: "algo-mern-oj.appspot.com",
  messagingSenderId: "577197247187",
  appId: "1:577197247187:web:43eca56bc8ad7355392226"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);