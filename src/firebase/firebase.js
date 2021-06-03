import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA07EKf301UP8ETAYs_qbbd00J9UscvFfI",
  authDomain: "barker-app-5af02.firebaseapp.com",
  projectId: "barker-app-5af02",
  storageBucket: "barker-app-5af02.appspot.com",
  messagingSenderId: "728074132045",
  appId: "1:728074132045:web:8a51d747cbcc465daada04",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
