// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf7IN3_hc16yUpR-6ZiM2FPeclHmq00eY",
  authDomain: "advance-prep.firebaseapp.com",
  projectId: "advance-prep",
  storageBucket: "advance-prep.firebasestorage.app",
  messagingSenderId: "875078468125",
  appId: "1:875078468125:web:6bf6ca3ed98a043c33bcf4",
  measurementId: "G-3GZD61FZKZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export default {auth, db};