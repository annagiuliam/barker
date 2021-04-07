import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { useParams } from "react-router-dom";
import UserTile from "../UserTile";

const Following = (props) => {
  const { users } = props;
  const { uid } = useParams();
  const { currentUser } = useContext(BarkerContext);
  const currUser = users.find((user) => user.uid === currentUser.uid);
  const profileOwner = users.find((user) => user.uid === uid);
  let followingUsers = [];
  profileOwner.following.forEach((uid) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === uid) {
        followingUsers.push(users[i]);
      }
    }
  });

  return (
    <div className="tiles-container">
      {followingUsers.map((user) => (
        <UserTile user={user} currUser={currUser} key={user.uid} />
      ))}
    </div>
  );
};

export default Following;
