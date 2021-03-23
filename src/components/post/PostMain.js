import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
const PostMain = (props) => {
  const { post, type } = props;
  //const postClass = rebark ? "post-rebark" : "post-main";
  const postClass = `${type}-main`;

  return (
    <div className={postClass} id={post.id}>
      <div className="user-info">
        <img alt="pic" src={post.url} className="avatar-img"></img>
        <Link to={`/profile/${post.uid}`}>
          <span className="username">{post.username}</span>
        </Link>
      </div>
      <div className="post-content">{post.text}</div>
    </div>
  );
};

export default PostMain;
