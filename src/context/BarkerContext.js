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
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  // const [rebarkText, setRebarkText] = useState("");
  const [error, setError] = useState(null);

  const [signInModal, setSignInModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        afterLoginActions(user);
        downloadPosts();
        downloadUsers();
      } else setUserLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    //console.log(posts);
    //console.log(userInfo);
    //console.log(users);
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
  function downloadUsers() {
    db.collection("users").onSnapshot(
      (snapshot) => {
        const users = snapshot.docs.map((doc) => {
          return { uid: doc.id, ...doc.data() };
        });
        setUsers(users);
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
        addToUsersCollection(user);
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

        user.updateProfile({
          displayName: anonName,
        });
      })
      .then(() => {
        const user = auth.currentUser;
        user
          .reload()
          .then(() => {
            const refreshUser = auth.currentUser;
            addToUsersCollection(refreshUser);
          })
          .then(() => {
            const currUser = auth.currentUser;
            afterLoginActions(currUser);
            setSignInModal(false);
          });
      })

      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  function addToUsersCollection(user) {
    const imageUrl = user.photoURL || placeholder;
    // create user collection with UID = to curr user uid at authentication
    db.collection("users")
      .doc(user.uid)
      .set({
        // uid: user.uid,
        username: user.displayName,
        url: imageUrl,
        followers: [],
        following: [],
      })
      .then(() => console.log("succesfully added to user collection"))
      .catch((error) => console.log(error.message));
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

  function submitPost(e, rebarkText = null, originalId = null, rebark = false) {
    e.preventDefault();

    db.collection("posts")
      .add({
        uid: userInfo.uid,
        username: userInfo.username,
        url: userInfo.url,
        text: rebarkText || postText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        comments: 0,
        likes: 0,
        likedBy: [],
        isRebark: rebark,
        rebarkedBy: [],
        originalPostId: originalId || "",
      })
      .then(() => setPostText(""))
      .catch((error) => console.log("error", error.message));
  }
  // function updateRebark(e) {
  //   setRebarkText(e.target.value);
  // }

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
        // rebarkText
        signInModal,
        userInfo,
        userLoggedIn,
        users,

        logOut,
        signIn,
        signInAnonymous,
        showSignInModal,

        submitPost,
        updateAnonName,
        updatePost,
        // updateRebark,
      }}
    >
      {children}
    </BarkerContext.Provider>
  );
};
