import React from "react";
import { Link } from "react-router-dom";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";
import PostMain from "../post/PostMain";

const CommentModal = (props) => {
  const { post, submitComment, closeCommentModal, hashedText } = props;
  return (
    <div className="modal">
      <section className="input-modal-main">
        <CloseButton
          onClick={closeCommentModal}
          btnClass={"close-btn-bottom"}
        />
        <div className="input-modal-content">
          <div className="original-wrapper">
            <div className="original-left">
              <div className="modal-avatar-wrapper">
                <img
                  alt="avatar"
                  src={post.url}
                  className="post-avatar-img"
                ></img>
              </div>
              <div className="connection-line"></div>
            </div>
            <div className="original-right">
              <div className="original-right-top">
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

                <div className="post-content">
                  <div className="post-text">{hashedText}</div>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="upload"
                      className="post-img"
                    ></img>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="post-edit-container">
            <InputForm
              post={post}
              // submitFunction={submitRebark}
              postType={"rebark"}
              form={"rebark"}
            />
          </div> */}

          <div className="modal-post-input-wrapper">
            <div className="modal-input-left"></div>
            <div className="modal-input-right"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommentModal;