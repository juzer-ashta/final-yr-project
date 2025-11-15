// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLPFWpBMN_WmiZfyczW5UMAwksVrMZcQU",
  authDomain: "maps-juz-478021.firebaseapp.com",
  projectId: "maps-juz-478021",
  storageBucket: "maps-juz-478021.firebasestorage.app",
  messagingSenderId: "885600265567",
  appId: "1:885600265567:web:41a0d2b1212dc3852ac2ea",
  measurementId: "G-7T5HSMHBQK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);