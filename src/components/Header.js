import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

// import firebaseApp from "../firebase/firebase";
// import firebase from "firebase/app";

const Header = () => {
  const { signIn, logOut, userLoggedIn } = useContext(BarkerContext);
  return (
    <header id="header">
      {!userLoggedIn && <button onClick={signIn}>Log in with Google</button>}
      {userLoggedIn && <button onClick={logOut}>Log Out</button>}
    </header>
  );
};

export default Header;
