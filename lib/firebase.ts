// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Analytics is client-side only, careful with SSR

const firebaseConfig = {
    apiKey: "AIzaSyCrTlHtOy8wUCKCS4EtJbAIDxx8nXjLQ3g",
    authDomain: "cspwala-c99b1.firebaseapp.com",
    projectId: "cspwala-c99b1",
    storageBucket: "cspwala-c99b1.firebasestorage.app",
    messagingSenderId: "911648525243",
    appId: "1:911648525243:web:740df4f1cc116c5921129e",
    measurementId: "G-MHKTRD3439"
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Analytics setup (optional, client-side only check)
// let analytics;
// if (typeof window !== "undefined") {
//   import("firebase/analytics").then(({ getAnalytics }) => {
//     analytics = getAnalytics(app);
//   });
// }

export { db };
