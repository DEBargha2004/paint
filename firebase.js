// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhQHc7bmrMNTsbE2SzGZ3FG6msOZ8nUMA",
  authDomain: "paint-cdb3f.firebaseapp.com",
  projectId: "paint-cdb3f",
  storageBucket: "paint-cdb3f.appspot.com",
  messagingSenderId: "715804700355",
  appId: "1:715804700355:web:a2d9adcf81f0816f29bc76",
  measurementId: "G-ZVZK7CX7RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);