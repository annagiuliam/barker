import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

// import firebaseApp from "../firebase/firebase";
// import firebase from "firebase/app";

const Header = () => {
  const { userLoggedIn, userName, avatarUrl, signIn, logOut } = useContext(
    BarkerContext
  );
  return (
    <header id="header">
      <div>
        <div>
          <img id="avatar-img" src={avatarUrl} alt="user avatar"></img>
        </div>
        <div>{userName}</div>
        <button onClick={logOut}>Log Out</button>
      </div>
    </header>
  );
};

export default Header;
