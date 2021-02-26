import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
import placeholder from "../images/profile_placeholder.png";

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export const BarkerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const imageUrl = user.photoURL || placeholder;
        setUserName(user.displayName);
        setUserLoggedIn(true);
        setAvatarUrl(imageUrl);

        //console.log(posts);
      } else setUserLoggedIn(false);
    });
  });
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
    console.log(posts); //KEEPS LOGGING
  }, [posts]);

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

        const imageUrl = user.photoURL || placeholder;
        setUserName(user.displayName);
        setUserLoggedIn(true);
        setAvatarUrl(imageUrl);
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
