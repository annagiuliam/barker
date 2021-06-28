import React from "react";
import { Link, useHistory } from "react-router-dom";

const reactStringReplace = require("react-string-replace");

const RebarkedPost = (props) => {
  const { post } = props;

  const history = useHistory();
  const redirect = (e) => {
    history.push({
      pathname: `/post/${post.id}`,
    });
  };

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
    <div
      className="rebarked-main"
      id={post.id}
      onClick={(e) => {
        e.stopPropagation();
        redirect();
      }}
    >
      <div className="rebarked-top">
        <div className="rebarked-avatar-wrapper">
          <img
            alt="avatar"
            src={post.url}
            className="rebarked-avatar-img"
          ></img>
        </div>
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
      <div className="rebarked-bottom">
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
