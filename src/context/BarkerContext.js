import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
import placeholder from "../images/profile_placeholder.png";

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export const BarkerContext = createContext();

export const ContextProvider = ({ children }) => {
<<<<<<< HEAD
  const [database] = useState(db);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  //const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [error, setError] = useState(null);
=======
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [authError, setAuthError] = useState(null);
>>>>>>> ef36421aafba61a934bc6909604c0fd2dcd09323

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const imageUrl = user.photoURL || placeholder;
<<<<<<< HEAD
        // setCurrentUser(user);
        setUserName(user.displayName);
        setUserLoggedIn(true);
        setAvatarUrl(imageUrl);
        downloadPosts();
      } else setUserLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    console.log(posts);
  });

  function downloadPosts() {
    db.collection("posts").onSnapshot(
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => doc.data());
        setPosts(posts);
      },
      (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
        setError(displayedError);
      }
    );
  }
=======
        setUserName(user.displayName);
        setUserLoggedIn(true);
        setAvatarUrl(imageUrl);

        //console.log(posts);
      } else setUserLoggedIn(false);
    });
  });
  useEffect(() => {
    const dbCall = db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
    //console.log(posts);
  }, []);

  useEffect(() => console.log(posts));
>>>>>>> ef36421aafba61a934bc6909604c0fd2dcd09323

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
<<<<<<< HEAD
        //setCurrentUser(user);
=======
>>>>>>> ef36421aafba61a934bc6909604c0fd2dcd09323
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
<<<<<<< HEAD
        setError(displayedError);
=======
        setAuthError(displayedError);
>>>>>>> ef36421aafba61a934bc6909604c0fd2dcd09323
      });
  }

  function logOut() {
    auth.signOut().then(() => {
      console.log("logged out");
      setUserLoggedIn(false);
    });
  }

  function updatePost(e) {
    setPostText(e.target.value);
  }

  function submitPost(e) {
    e.preventDefault();
    db.collection("posts")
      .add({
        userUid: auth.currentUser.uid,
        text: postText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => console.log("error", error.message));
  }

  return (
    <BarkerContext.Provider
      value={{
        database,
        userName,
        userLoggedIn,
        error,
        avatarUrl,
        posts,
        signIn,
        logOut,
        submitPost,
        updatePost,
      }}
    >
      {children}
    </BarkerContext.Provider>
  );
};
