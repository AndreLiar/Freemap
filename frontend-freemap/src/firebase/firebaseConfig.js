// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFxonLc3G4RFswquEuAHn61uByf3cwScw",
  authDomain: "freemap-2e057.firebaseapp.com",
  projectId: "freemap-2e057",
  storageBucket: "freemap-2e057.firebasestorage.app",
  messagingSenderId: "902968297940",
  appId: "1:902968297940:web:ce5b6204b21dee634fee41",
  measurementId: "G-3XRX2H1X4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
