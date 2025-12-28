import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF89UXYPnxpbRPhyyrMNHR6MHzlWCgB1s",
  authDomain: "order-management-portal-9070b.firebaseapp.com",
  projectId: "order-management-portal-9070b",
  storageBucket: "order-management-portal-9070b.appspot.com",
  messagingSenderId: "595213262976",
  appId: "1:595213262976:web:8aa104ffc6eb21272ac665",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
