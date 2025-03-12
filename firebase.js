// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_1C1kD02UmLi4wgf02bkigve2Xtg5kn0",
  authDomain: "taskx-f8b52.firebaseapp.com",
  projectId: "taskx-f8b52",
  storageBucket: "taskx-f8b52.firebasestorage.app",
  messagingSenderId: "787997712321",
  appId: "1:787997712321:web:d4aef7955262fc19b3d940",
  measurementId: "G-3WHTR3E4VQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);