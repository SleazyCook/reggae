// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzy4TkGLE_iwQ5plkSSN6Nw0JhfzSj68Y",
  authDomain: "houston-event-calendar.firebaseapp.com",
  projectId: "houston-event-calendar",
  storageBucket: "houston-event-calendar.firebasestorage.app",
  messagingSenderId: "953496316839",
  appId: "1:953496316839:web:7ae606bf3d760c247ae482",
  measurementId: "G-SB5TBEL80D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // 👈 this line gives you Firestore access

export { db };