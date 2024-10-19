import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC40...N3V6uA", // Senin API anahtarın burada
  authDomain: "feedhub-b53a7.firebaseapp.com",
  projectId: "feedhub-b53a7",
  storageBucket: "feedhub-b53a7.appspot.com",
  messagingSenderId: "193016323943",
  appId: "1:193016323943:web:749e415d078612f77699c2",
  measurementId: "G-5X80TEN5JD", // Bu alan isteğe bağlıdır
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication

// Initialize Firestore
const db = getFirestore(app); // Firestore Database

export { auth, db };
