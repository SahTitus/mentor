import { initializeApp } from "@firebase/app";
import { getAuth, } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwds_FDA6IfHkChexgpnkRWjKNLQGgX6o",
  authDomain: "gasodauth.firebaseapp.com",
  projectId: "gasodauth",
  storageBucket: "gasodauth.appspot.com",
  messagingSenderId: "544851657872",
  appId: "1:544851657872:web:4e9f264102209d25fb4415",
  measurementId: "G-6803397H3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };