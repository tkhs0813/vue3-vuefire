import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlTU9OXB77MFoLzZ1iendszaeYAPFN2xc",
  authDomain: "vue3-vuefire-4cd1f.firebaseapp.com",
  projectId: "vue3-vuefire-4cd1f",
  storageBucket: "vue3-vuefire-4cd1f.appspot.com",
  messagingSenderId: "727805774845",
  appId: "1:727805774845:web:b42ed0e2468aa8af74e794",
  measurementId: "G-723XPNBPLR",
});

export const googleAuthProvider = new GoogleAuthProvider();
