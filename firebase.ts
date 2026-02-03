// Firebase core
import { initializeApp } from "firebase/app";

// Firestore (DATABASE)
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBePN8kpl4206WGLid6sHdFy2Yi9ODyDPo",
  authDomain: "swiftplay-iot-vending.firebaseapp.com",
  projectId: "swiftplay-iot-vending",
  storageBucket: "swiftplay-iot-vending.firebasestorage.app",
  messagingSenderId: "45567777875",
  appId: "1:45567777875:web:869ebb412b68fc6f537aa6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore and EXPORT it
export const db = getFirestore(app);
