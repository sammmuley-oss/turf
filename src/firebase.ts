// Firebase client SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBePN8kpl4206WGLid6sHdFy2Yi9ODyDPo",
  authDomain: "swiftplay-iot-vending.firebaseapp.com",
  projectId: "swiftplay-iot-vending",
  storageBucket: "swiftplay-iot-vending.firebasestorage.app",
  messagingSenderId: "45567777875",
  appId: "1:45567777875:web:869ebb412b68fc6f537aa6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT AUTH (THIS FIXES YOUR ERROR)
export const auth = getAuth(app);
