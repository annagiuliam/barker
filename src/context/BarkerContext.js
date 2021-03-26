import React, { useState, createContext, useEffect, useCallback } from "react";
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
  const [users, setUsers] = useState([]);
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  //const [postText, setPostText] = useState("");

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const [signInModal, setSignInModal] = useState(false);

  useEffect(() => {
    function syncContents() {
      db.collection("contents")
        // .where("type", "!=", "comment")
        .orderBy("timestamp", "desc")
        // .where("type", "==", "comment")
        // .orderBy("timestamp", "asc")
        .onSnapshot(
          (snapshot) => {
            const fetchedContents = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });

            setContents(fetchedContents);
            const comments = fetchedContents
              .filter((item) => item.type === "comment")
              .sort((x, y) => x.timestamp - y.timestamp);

            setComments(comments);

            const posts = fetchedContents.filter(
              (item) => item.type === "post" || item.type === "rebark"
            );
            setPosts(posts);
          },
          (error) => {
            handleError(error);
          }
        );
    }

    function syncUsers() {
      db.collection("users").onSnapshot(
        (snapshot) => {
          const fetchedUsers = snapshot.docs.map((doc) => {
            return { uid: doc.id, ...doc.data() };
          });
          setUsers(fetchedUsers);
        },
        (error) => {
          handleError(error);
        }
      );
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        afterLoginActions(user);
        // downloadPosts();

        syncContents();

        syncUsers();
        // downloadComments();
      } else setUserLoggedIn(false);
    });
  }, []);

  // useEffect(() => {
  //   const posts = contents.filter(
  //     (item) => item.type === "post" || item.type === "rebark"
  //   );
  //   setPosts(posts);
  //   const comments = contents
  //     .filter((item) => item.type === "comment")
  //     .sort((x, y) => x.timestamp - y.timestamp);

  //   setComments(comments);
  //   // console.log(posts);
  //   // //console.log(userInfo);
  //   // console.log(users);
  //   // console.log(userInfo.username);
  // }, [contents]);

  useEffect(() => {
    console.log(contents);
    console.log(comments);
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
          handleError(error);
        }
      );
  }

  // function downloadComments() {
  //   database.collection("comments").onSnapshot(
  //     (snapshot) => {
  //       const comments = snapshot.docs.map((doc) => {
  //         return { id: doc.id, ...doc.data() };
  //       });
  //       setComments(comments);
  //     },
  //     (error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;

  //       console.log(errorMessage);
  //       const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
  //       // setError(displayedError);
  //       console.log(displayedError);
  //     }
  //   );
  // }

  // function downloadComments() {
  //   db.collection("comments").onSnapshot(
  //     (snapshot) => {
  //       const comments = snapshot.docs.map((doc) => {
  //         return { id: doc.id, ...doc.data() };
  //       });
  //       setComments(comments);
  //     },
  //     (error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;

  //       console.log(errorMessage);
  //       const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
  //       setError(displayedError);
  //     }
  //   );
  // }
  async function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      let user = result.user;

      addToUsersCollection(user);
      afterLoginActions(user);
    } catch (error) {
      handleError(error);
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
      handleError(error);
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
      handleError(error);
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
      handleError(error);
    }
  }

  async function submitPost(
    e,
    submittedText,
    type,
    // collection,
    originalId = null
  ) {
    e.preventDefault();

    try {
      await db.collection("contents").add({
        uid: userInfo.uid,
        username: userInfo.username,
        url: userInfo.url,
        //text: rebarkText || postText,
        type: type,
        //collection: collection,
        text: submittedText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        comments: 0,
        likes: 0,
        likedBy: [],
        //isRebark: rebark,
        rebarkedBy: [],
        originalPostId: originalId || "",
      });
      //setPostText("");
    } catch (error) {
      handleError(error);
    }
  }

  function updateAnonName(e) {
    setAnonName(e.target.value);
  }

  function showSignInModal() {
    setSignInModal(true);
  }

  function closeError() {
    setShowError(false);
  }

  function handleError(error) {
    setShowError(true);
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);
    const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
    setError(displayedError);
  }

  return (
    <BarkerContext.Provider
      value={{
        anonName,
        comments,
        contents,
        database,
        error,
        posts,
        //postText,
        // rebarkText
        showError,
        signInModal,
        userInfo,
        userLoggedIn,
        users,
        closeError,
        handleError,
        logOut,
        signIn,
        signInAnonymous,
        showSignInModal,

        submitPost,
        updateAnonName,
        // updatePost,
        // updateRebark,
      }}
    >
      {children}
    </BarkerContext.Provider>
  );
};
