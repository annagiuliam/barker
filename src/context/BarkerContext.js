import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export const BarkerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setUserLoggedIn(true);
    //     //console.log(user.displayName);
    //   } else setUserLoggedIn(false);
    // });
  });

  function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        const imageUrl = user.photoURL || "/images/profile_placeholder.png";
        setUserName(user.displayName);
        setUserLoggedIn(true);
        console.log(userName);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage);
        const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
        setAuthError(displayedError);
      });
  }

  function logOut() {
    auth.signOut().then(() => {
      console.log("logged out");
      setUserLoggedIn(false);
    });
  }

  return (
    <BarkerContext.Provider
      value={{ userName, userLoggedIn, authError, avatarUrl, signIn, logOut }}
    >
      {children}
    </BarkerContext.Provider>
  );
};
