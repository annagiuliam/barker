import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
const PostMain = (props) => {
  const { post, view } = props;
  //const postClass = rebark ? "post-rebark" : "post-main";
  const postClass = view ? `${view}-main` : "post-main";

  return (
    <div className={postClass} id={post.id}>
      <div className="user-info">
        <img alt="pic" src={post.url} className="avatar-img"></img>
        <Link to={`/profile/${post.uid}`} className="link-username">
          <span className="username">{post.username}</span>
        </Link>
      </div>
      {/* do not show link if it is a comment */}
      {view === "comment" ? (
        <div className="post-content">{post.text}</div>
      ) : (
        <Link to={`/post/${post.id}`} className="link-text-content">
          <div className="post-content">{post.text}</div>
        </Link>
      )}
    </div>
  );
};

export default PostMain;
