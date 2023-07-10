import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQf-xLwC4r7RIeBU_bhhTXoaEflH7UCmM",
  authDomain: "consultus-3526e.firebaseapp.com",
  projectId: "consultus-3526e",
  storageBucket: "consultus-3526e.appspot.com",
  messagingSenderId: "788333348419",
  appId: "1:788333348419:web:ffc308150b0896ce7076f6",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get the auth object
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
