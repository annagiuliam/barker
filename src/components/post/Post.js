import React, { useState, useContext, useEffect } from "react";

import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import PostFooter from "./PostFooter";
import CommentInput from "./CommentInput";

import firebase from "firebase/app";
import firebaseApp from "../../firebase/firebase";
const db = firebaseApp.firestore();

const Post = (props) => {
  const { post } = props;
  const [commentText, setCommentText] = useState("");
  const { userInfo } = useContext(BarkerContext);
  const [showComment, setShowComment] = useState(false);

  const commentNumber = post.comments > 0 ? post.comments : "";
  const likesNumber = post.likedBy.length > 0 ? post.likedBy.length : "";

  function displayComment() {
    setShowComment(true);
  }

  function updateComment(e) {
    setCommentText(e.target.value);
  }
  function submitComment(e) {
    e.preventDefault();

    const postRef = db.collection("posts").doc(post.id);
    postRef
      .update({
        comments: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        postRef.collection("comments").add({
          uid: userInfo.uid,
          username: userInfo.username,
          url: userInfo.url,
          text: commentText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .then(() => {
        setCommentText("");
        setShowComment(false);
      })
      .catch((error) => console.log("error", error.message));
  }

  function addLike() {
    const postRef = db.collection("posts").doc(post.id);
    postRef
      .update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(userInfo.uid),
      })
      .catch((error) => console.log("error", error.message));
  }
  return (
    <div className="post-container" id={post.id}>
      <PostMain post={post} />
      <PostFooter
        displayComment={displayComment}
        addLike={addLike}
        commentNumber={commentNumber}
        likesNumber={likesNumber}
      />
      {showComment && (
        <CommentInput
          submitComment={submitComment}
          updateComment={updateComment}
          commentText={commentText}
        />
      )}
    </div>
  );
};

export default Post;
