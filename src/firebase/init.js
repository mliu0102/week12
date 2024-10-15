// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQfTvftqiNtBqQ5KbSTTeWs2K0WSByk94",
  authDomain: "week7-ed0c6.firebaseapp.com",
  projectId: "week7-ed0c6",
  storageBucket: "week7-ed0c6.appspot.com",
  messagingSenderId: "160386934949",
  appId: "1:160386934949:web:35816215f62fd78a78054c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db
