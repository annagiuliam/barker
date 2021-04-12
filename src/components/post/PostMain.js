import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { Link, useHistory } from "react-router-dom";

import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const reactStringReplace = require("react-string-replace");

const PostMain = (props) => {
  const { post, view, deletePost, openEditModal } = props;
  const { currentUser } = useContext(BarkerContext);

  const postClass = view ? `${view}-main` : "post-main";
  const history = useHistory();
  const redirect = (e) => {
    e.stopPropagation();
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
      className={postClass}
      id={post.id}
      // onClick={view === "rebarked" ? redirect : undefined}
      onClick={redirect}
    >
      <div className="main-top">
        <div className="user-info">
          <img alt="pic" src={post.url} className="avatar-img"></img>
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
          <div className="post-icon-div">
            <div>
              <BsTrash
                className="post-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost();
                }}
              />
            </div>
            <div>
              <AiOutlineEdit
                className="post-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="post-content">{hashedText}</div>

      {/* <Link to={`/post/${post.id}`} className="link-text-content">
        <div className="post-content">{post.text}</div>
      </Link> */}
    </div>
  );
};

export default PostMain;
