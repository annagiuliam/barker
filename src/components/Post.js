import React, { useState, useContext, useEffect } from "react";
import { FaRegComment, FaPaw } from "react-icons/fa";
import { BarkerContext } from "../context/BarkerContext";

import firebase from "firebase/app";
import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();

const Post = (props) => {
  const { post } = props;
  const [commentText, setCommentText] = useState("");
  const { userInfo, addComment } = useContext(BarkerContext);
  const [showComment, setShowComment] = useState(false);

  const commentNumber = post.comments > 0 ? post.comments : "";
  const likesNumber = post.likes > 0 ? post.likes : "";

  useEffect(() => {
    console.log(commentText);
  });

  function displayComment() {
    setShowComment(true);
  }

  function updateComment(e) {
    setCommentText(e.target.value);
  }
  function submitComment(e) {
    e.preventDefault();
    // RIPRENDI DA QUI UPDATE POST
    const postRef = db.collection("posts").doc(post.id);

    postRef
      .collection("comments")
      .add({
        uid: userInfo.uid,
        username: userInfo.username,
        url: userInfo.url,
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setCommentText("");
        setShowComment(false);
        addComment(post.id);
      })
      .catch((error) => console.log("error", error.message));
    // setCommentText("");
    // setShowComment(false);
    // addComment(post.id);
  }
  return (
    <div className="post-container" id={post.id}>
      <div className="post-main">
        <div className="user-info">
          <img alt="pic" src={post.url} className="avatar-img"></img>
          <span className="username">{post.username}</span>
        </div>
        <div className="post-content">{post.text}</div>
      </div>

      <div className="post-footer">
        <div className="post-icon-div">
          <FaRegComment className="post-icon" onClick={displayComment} />
          <div>{commentNumber}</div>
        </div>
        <div className="post-icon-div">
          <FaPaw className="post-icon" />
          <div>{likesNumber}</div>
        </div>
      </div>
      <div
        className="comment-input"
        style={{ display: showComment ? "block" : "none" }}
      >
        <form onSubmit={submitComment}>
          <input
            type="text"
            onChange={updateComment}
            value={commentText}
          ></input>
          <button type="submit">Send comment</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
