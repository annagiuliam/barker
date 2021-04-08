import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();

const UserTile = (props) => {
  const { user, users } = props;
  const { follow, unfollow, currentUser } = useContext(BarkerContext);
  //search for current users in users collection because all data are complete in the collection
  const following = users
    .find((user) => user.uid === currentUser.uid)
    .following.includes(user.uid);

  return (
    <div className="user-tile">
      <div className="user-info">
        <img alt="pic" src={user.url} className="avatar-img"></img>
        <Link to={`/profile/${user.uid}`} className="link-username">
          <span className="username">{user.username}</span>
        </Link>
      </div>
      {user.uid !== currentUser.uid && following && (
        <button onClick={() => unfollow(user)}>Unfollow</button>
      )}
      {user.uid !== currentUser.uid && !following && (
        <button onClick={() => follow(user)}>Follow</button>
      )}
    </div>
  );
};

export default UserTile;
