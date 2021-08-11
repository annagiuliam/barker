import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

const UserTile = (props) => {
  const { user, users } = props;
  const { follow, unfollow, currentUser } = useContext(BarkerContext);
  //check if the current user follows the user
  const following = users
    .find((user) => user.uid === currentUser.uid)
    .following.includes(user.uid);

  return (
    <div className="user-tile">
      <div className="user-info">
        <img alt="pic" src={user.url} className="avatar-img-small"></img>
        <Link
          to={`/profile/${user.uid}`}
          className="link-username"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="username">{user.username}</span>
        </Link>
      </div>
      {user.uid !== currentUser.uid && following && (
        <button className="follow-action-btn" onClick={() => unfollow(user)}>
          Unfollow
        </button>
      )}
      {user.uid !== currentUser.uid && !following && (
        <div>
          <button className="follow-action-btn" onClick={() => follow(user)}>
            Follow
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTile;
