// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGac-C-PVc4gOsPNH2kKJAke8HukgyRxI",
  authDomain: "topsis-ec787.firebaseapp.com",
  projectId: "topsis-ec787",
  storageBucket: "topsis-ec787.appspot.com",
  messagingSenderId: "497387222611",
  appId: "1:497387222611:web:0d0fe63c875cc4c4ccb8a6",
  measurementId: "G-B3C0SPMMX9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
