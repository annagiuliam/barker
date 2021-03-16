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
  // const [currUsername, setCurrUsername] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");

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
    console.log(posts);
    //console.log(userInfo);
    console.log(users);

    console.log(userInfo.username);
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

  async function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      let user = result.user;

      addToUsersCollection(user);
      afterLoginActions(user);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
      setError(displayedError);
    }
  }

  async function signInAnonymous(e) {
    e.preventDefault();
    try {
      const result = await auth.signInAnonymously();
      const user = result.user;
      // add the typed username to the userProfile in firebase
      await user.updateProfile({
        displayName: anonName,
      });

      const currUser = await auth.currentUser;
      //add curr user to user collection in firebase
      await addToUsersCollection(currUser, anonName);
      // set user information in state
      await afterLoginActions(currUser, anonName);
      setSignInModal(false);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }
  }
  async function addToUsersCollection(user, username = null) {
    try {
      const imageUrl = user.photoURL || placeholder;
      // create user collection with UID = to curr user uid at authentication
      const displayName = username || user.displayName;
      await db.collection("users").doc(user.uid).set({
        // no need to add uid because it is the doc id
        username: displayName,
        url: imageUrl,
        followers: [],
        following: [],
      });
      console.log("succesfully added to user collection");
    } catch (error) {
      console.log(error.message);
    }
  }

  function afterLoginActions(user, username = null) {
    const imageUrl = user.photoURL || placeholder;
    const displayName = username || user.displayName;

    const info = {
      uid: user.uid,
      username: displayName,
      url: imageUrl,
    };
    setUserInfo(info);
    setUserLoggedIn(true);
  }

  async function logOut() {
    try {
      await auth.signOut();
      setUserLoggedIn(false);
      setAnonName("");
      console.log("logged out");
    } catch (error) {
      console.log(error.message);
    }
  }

  function updatePost(e) {
    setPostText(e.target.value);
  }

  async function submitPost(
    e,
    rebarkText = null,
    originalId = null,
    rebark = false
  ) {
    e.preventDefault();
    try {
      await db.collection("posts").add({
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
      });
      setPostText("");
    } catch (error) {
      console.log("error", error.message);
    }
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
