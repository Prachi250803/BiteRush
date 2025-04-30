// src/firebase.js

// Import core Firebase and required services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import auth
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGPU5Uiof0M78gWbz8-3Fk7JdJ5P3Of28",
  authDomain: "rushbite-1f8bc.firebaseapp.com",
  projectId: "rushbite-1f8bc",
  storageBucket: "rushbite-1f8bc.firebasestorage.app",
  messagingSenderId: "381314674767",
  appId: "1:381314674767:web:0b3617da5e062155effa3a",
  measurementId: "G-K44VGP19Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export auth
export const auth = getAuth(app);

// (Optional) If you're using analytics, keep it
const analytics = getAnalytics(app);
