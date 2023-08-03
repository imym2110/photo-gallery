// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Sx5PmGlgVoR3MidorbtAsfchfYWA3W0",
  authDomain: "image-uploader-973de.firebaseapp.com",
  projectId: "image-uploader-973de",
  storageBucket: "image-uploader-973de.appspot.com",
  messagingSenderId: "736372460097",
  appId: "1:736372460097:web:ca63dd5a84b2255e98d4c0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
