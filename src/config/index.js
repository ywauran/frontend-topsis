// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQGwOrTB6Jd9h2NszJ2kt38BfeWvj7qNI",
  authDomain: "topsis-e5cc4.firebaseapp.com",
  databaseURL: "https://topsis-e5cc4-default-rtdb.firebaseio.com",
  projectId: "topsis-e5cc4",
  storageBucket: "topsis-e5cc4.appspot.com",
  messagingSenderId: "946495324146",
  appId: "1:946495324146:web:32905527d5eabaf78bb56b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
