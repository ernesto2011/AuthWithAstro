// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYFnQkZv9MfjdiUxLWVgmS-FeO2Wru3V8",
  authDomain: "astro-authentication-ad4be.firebaseapp.com",
  projectId: "astro-authentication-ad4be",
  storageBucket: "astro-authentication-ad4be.firebasestorage.app",
  messagingSenderId: "547594654409",
  appId: "1:547594654409:web:a8600e1dc9f6687cde3318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'es';
export const firebase ={
    auth,
    app
}