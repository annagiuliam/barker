import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const Feed = () => {
  const { posts, userName, avatarUrl } = useContext(BarkerContext);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-container">
          <div className="user-info">
            <img alt="pic" src={avatarUrl} className="avatar-img"></img>
            <span className="username">{userName}</span>
          </div>
          <div>{post.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
