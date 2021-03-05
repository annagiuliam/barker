import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const Feed = () => {
  const { posts, userInfo } = useContext(BarkerContext);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-container">
          <div className="user-info">
            <img alt="pic" src={post.url} className="avatar-img"></img>
            <span className="username">{post.username}</span>
          </div>
          <div className="post-content">{post.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
