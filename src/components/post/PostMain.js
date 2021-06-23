import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { Link, useHistory } from "react-router-dom";

import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const reactStringReplace = require("react-string-replace");

const PostMain = (props) => {
  const { post, view, deletePost, openEditModal, redirect, hashedText } = props;
  const { currentUser } = useContext(BarkerContext);

  const postClass = view ? `${view}-main` : "post-main";
  // const history = useHistory();
  // const redirect = (e) => {
  //   e.stopPropagation();
  //   history.push({
  //     pathname: `/post/${post.id}`,
  //   });
  // };

  // const hashedText = reactStringReplace(post.text, /(#\w+)/g, (match, i) => (
  //   <Link
  //     to={`/hashtag/${match.slice(1)}`}
  //     key={i + match}
  //     className="hashtag-link"
  //     onClick={(e) => {
  //       e.stopPropagation();
  //     }}
  //   >
  //     {match}
  //   </Link>
  // ));

  return (
    <div className={postClass} id={post.id} onClick={redirect}>
      <div className="post-left">
        <img alt="avatar" src={post.url} className="avatar-img"></img>
      </div>
      <div className="post-right">
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
          {currentUser.uid === post.uid && view !== "rebarked" && (
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
          {post.imageUrl && (
            <img src={post.imageUrl} alt="upload" className="post-img"></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostMain;
