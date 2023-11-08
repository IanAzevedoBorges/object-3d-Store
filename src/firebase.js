import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2746e7Sssx9hXF28ZYCe11CuNKUD611o",
  authDomain: "object-3d-store.firebaseapp.com",
  projectId: "object-3d-store",
  storageBucket: "object-3d-store.appspot.com",
  messagingSenderId: "602898122069",
  appId: "1:602898122069:web:e3b10d1fdcc9c83d2e1bdc",
  measurementId: "G-GNFPDBD8WT",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
