import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

// import firebaseApp from "../firebase/firebase";
// import firebase from "firebase/app";

const Header = () => {
  const { userLoggedIn, userInfo, signIn, logOut } = useContext(BarkerContext);
  return (
    <header id="header">
      <div>
        <img className="avatar-img" src={userInfo.url} alt="user avatar"></img>
      </div>
      <Link to={`/profile/${userInfo.uid}`} className="link-username">
        <span className="username">{userInfo.username}</span>
      </Link>
      <button onClick={logOut}>Log Out</button>
    </header>
  );
};

export default Header;
