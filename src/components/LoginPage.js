import React from "react";
import firebaseApp from "../firebase/firebase";
import firebase from "firebase/app";

const LoginPage = () => {
  function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider);
  }
  return <button onClick={signIn}>Sign In</button>;
};

export default LoginPage;
