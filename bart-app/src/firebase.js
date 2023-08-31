// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgXo92M1Xmav2t3G9TIOmUKDF8WpqGoyc",
  authDomain: "reactbart.firebaseapp.com",
  projectId: "reactbart",
  storageBucket: "reactbart.appspot.com",
  messagingSenderId: "922397879243",
  appId: "1:922397879243:web:2e8ac50a1729690200e44e",
  measurementId: "G-QW7XGGJ405"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};
export default app;
export const db = getFirestore(app);