import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
import placeholder from "../images/profile_placeholder.png";

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export const BarkerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [database] = useState(db);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  //const [currentUser, setCurrentUser] = useState(null);
  const [anonName, setAnonName] = useState("");
  // const [avatarUrl, setAvatarUrl] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [error, setError] = useState(null);

  const [signInModal, setSignInModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        afterLoginActions(user);
        downloadPosts();
      } else setUserLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    console.log(posts);
    console.log(userInfo);
  });

  function downloadPosts() {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          const posts = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
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
        afterLoginActions(user);
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
        setError(displayedError);
      });
  }

  function signInAnonymous(e) {
    e.preventDefault();
    auth
      .signInAnonymously()
      .then((result) => {
        const user = result.user;

        user
          .updateProfile({
            displayName: anonName,
          })
          .then(() => {
            afterLoginActions(user);
            setSignInModal(false);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  function afterLoginActions(user) {
    const imageUrl = user.photoURL || placeholder;

    const info = {
      uid: user.uid,
      username: user.displayName,
      url: imageUrl,
    };
    setUserInfo(info);
    setUserLoggedIn(true);
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
        uid: userInfo.uid,
        username: userInfo.username,
        url: userInfo.url,
        text: postText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      //.then(() => setPostText(""))
      .catch((error) => console.log("error", error.message));
    setPostText("");
  }

  function updateAnonName(e) {
    setAnonName(e.target.value);
  }

  function showSignInModal() {
    setSignInModal(true);
  }

  return (
    <BarkerContext.Provider
      value={{
        anonName,
        database,
        error,
        posts,
        postText,

        signInModal,
        userInfo,
        userLoggedIn,

        logOut,
        signIn,
        signInAnonymous,
        showSignInModal,
        submitPost,

        updatePost,
        updateAnonName,
      }}
    >
      {children}
    </BarkerContext.Provider>
  );
};
