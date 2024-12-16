import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDKh99S0YvxeSRrWxBIA9eukctbWroTi8",
  authDomain: "invest-36f30.firebaseapp.com",
  projectId: "invest-36f30",
  storageBucket: "invest-36f30.firebasestorage.app",
  messagingSenderId: "1093009578764",
  appId: "1:1093009578764:web:f1dc43f20057dfae2e8729",
  measurementId: "G-EBSWZYJ0XQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
