// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtRO-bBy2U26oJRNHQO1iDfouyvc_TD2g",
  authDomain: "rn-social-5a6d5.firebaseapp.com",
  projectId: "rn-social-5a6d5",
  storageBucket: "rn-social-5a6d5.appspot.com",
  messagingSenderId: "384586225475",
  appId: "1:384586225475:web:860e882e5eb3f5624681f6",
  measurementId: "G-YYT3YNH459",
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
export const storage = getStorage(db);
