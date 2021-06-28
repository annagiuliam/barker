import React from "react";
import { Link } from "react-router-dom";

const reactStringReplace = require("react-string-replace");

const RebarkedPost = (props) => {
  const { post, redirect } = props;

  const hashedText = reactStringReplace(post.text, /(#\w+)/g, (match, i) => (
    <Link
      to={`/hashtag/${match.slice(1)}`}
      key={i + match}
      className="hashtag-link"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {match}
    </Link>
  ));

  return (
    <div className="rebarked-main" id={post.id} onClick={redirect}>
      <div className="left-side">
        <div className="modal-avatar-wrapper">
          <img alt="avatar" src={post.url} className="avatar-img"></img>
        </div>
      </div>
      <div className="right-side">
        <div className="post-right-top">
          <div className="username-container">
            <Link
              to={`/profile/${post.uid}`}
              className="link-username"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="username">{post.username}</span>
            </Link>
          </div>
        </div>
        <div className="post-content">
          <div className="post-text">{hashedText}</div>
          {post.imageUrl && (
            <div className="image-container">
              <img src={post.imageUrl} alt="upload" className="post-img"></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RebarkedPost;
