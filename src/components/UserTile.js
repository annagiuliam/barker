import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();

const UserTile = (props) => {
  const { user, currUser } = props;
  const { handleError } = useContext(BarkerContext);

  function follow() {
    //CONTROLLA INSERIMENTO DATI
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(currUser.uid),
      })
      .catch((error) => handleError(error));

    const currRef = db.collection("users").doc(currUser.uid);
    currRef
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(user.uid),
      })
      .catch((error) => handleError(error));
  }

  return (
    <div className="user-tile">
      <div className="user-info">
        <img alt="pic" src={user.url} className="avatar-img"></img>
        <Link to={`/profile/${user.uid}`} className="link-username">
          <span className="username">{user.username}</span>
        </Link>
      </div>
      <button onClick={follow}>Follow</button>
    </div>
  );
};

export default UserTile;
