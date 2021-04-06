import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { useParams } from "react-router-dom";
import UserTile from "../UserTile";

const Followers = (props) => {
  const { users } = props;
  const { uid } = useParams();
  const { userInfo } = useContext(BarkerContext);
  const currUser = users.find((user) => user.uid === userInfo.uid);
  const profileOwner = users.find((user) => user.uid === uid);
  let followers = [];
  profileOwner.followers.map((uid) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === uid) {
        followers.push(users[i]);
      }
    }
  });

  return (
    <div className="tiles-container">
      {followers.map((follower) => (
        <UserTile user={follower} currUser={currUser} key={follower.uid} />
      ))}
    </div>
  );
};

export default Followers;
