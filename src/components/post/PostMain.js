import React from "react";

const PostMain = (props) => {
  const { post } = props;
  return (
    <div className="post-main">
      <div className="user-info">
        <img alt="pic" src={post.url} className="avatar-img"></img>
        <span className="username">{post.username}</span>
      </div>
      <div className="post-content">{post.text}</div>
    </div>
  );
};

export default PostMain;
