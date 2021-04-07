import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

// import firebaseApp from "../firebase/firebase";
// import firebase from "firebase/app";

const Header = () => {
  const { currentUser, logOut } = useContext(BarkerContext);
  return (
    <header id="header">
      <div>
        <img
          className="avatar-img"
          src={currentUser.url}
          alt="user avatar"
        ></img>
      </div>
      <Link to={`/profile/${currentUser.uid}`} className="link-username">
        <span className="username">{currentUser.username}</span>
      </Link>
      <button onClick={logOut}>Log Out</button>
    </header>
  );
};

export default Header;
