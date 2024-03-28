// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-scoremaster-1763b.firebaseapp.com",
  projectId: "ai-scoremaster-1763b",
  storageBucket: "ai-scoremaster-1763b.appspot.com",
  messagingSenderId: "485424401027",
  appId: "1:485424401027:web:c58783c2a4f603176569b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);