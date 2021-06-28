import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { Link } from "react-router-dom";

import RebarkedPost from "./RebarkedPost";

import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const reactStringReplace = require("react-string-replace");

const PostMain = (props) => {
  const {
    post,
    view,
    deletePost,
    openEditModal,
    redirect,
    modal,
    originalPost,
  } = props;
  const { currentUser } = useContext(BarkerContext);

  const modalClass = modal ? modal : "";
  const postClass = view
    ? `${view}-main ${modalClass}`
    : `post-main ${modalClass}`;

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
    <div className={postClass} id={post.id} onClick={redirect}>
      <div className="left-side">
        <div className="modal-avatar-wrapper">
          <img alt="avatar" src={post.url} className="avatar-img"></img>
        </div>
        {(modal === "comment" || view === "comm-post-profile") && (
          <div className="connection-line"></div>
        )}
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
          {currentUser.uid === post.uid && view !== "rebarked" && !modal && (
            <div className="post-right-icons">
              <div>
                <BsTrash
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost();
                  }}
                />
              </div>
              <div>
                <AiOutlineEdit
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal();
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="post-content">
          <div className="post-text">{hashedText}</div>
          {post.imageUrl && modal !== "comment" && (
            <div className="image-container">
              <img src={post.imageUrl} alt="upload" className="post-img"></img>
            </div>
          )}

          {originalPost && (
            <RebarkedPost post={originalPost} redirect={redirect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostMain;
