import React, { useState, useContext, useEffect } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import PostFooter from "./PostFooter";
import CommentInput from "./CommentInput";
import RebarkModal from "./RebarkModal";

import firebase from "firebase/app";
import firebaseApp from "../../firebase/firebase";
const db = firebaseApp.firestore();

const Post = (props) => {
  const { contents, post, view } = props;
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);

  const [commentText, setCommentText] = useState("");
  const [rebarkText, setRebarkText] = useState("");

  const [showComment, setShowComment] = useState(false);
  const [showRebark, setShowRebark] = useState(false);
  const [originalPost, setOriginalPost] = useState(null);

  const commentNumber = post.comments > 0 ? post.comments : "";
  const likesNumber = post.likedBy.length > 0 ? post.likedBy.length : "";
  const rebarkNum = post.rebarkedBy.length > 0 ? post.rebarkedBy.length : "";
  const containerClass = view
    ? `${view}-container clickable`
    : "post-container clickable";

  useEffect(() => {
    //find post that was rebarked
    function findOriginalPost() {
      let original;
      if (post.type === "rebark" && contents) {
        original = contents.find(function (ele) {
          return ele.id === post.originalPostId;
        });
      }
      setOriginalPost(original);
    }

    findOriginalPost();
  }, [contents, post.originalPostId, post.type]);

  function displayComment() {
    setShowComment(true);
  }

  function updateComment(e) {
    setCommentText(e.target.value);
  }

  function submitComment(e) {
    e.preventDefault();
    incrementCommentNumber();
    submitPost(e, commentText, "comment", post.id);
    setCommentText("");
    setShowComment(false);
  }

  async function incrementCommentNumber() {
    try {
      const postRef = await db.collection("contents").doc(post.id);
      await postRef.update({
        comments: firebase.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      handleError(error);
    }
  }

  function addLike() {
    const postRef = db.collection("contents").doc(post.id);
    postRef
      .update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      })
      .catch((error) => handleError(error));
  }

  function displayRebark() {
    // don't open rebarked modal if user has already rebarked this post
    if (!post.rebarkedBy.includes(currentUser.uid)) {
      setShowRebark(true);
    }
  }

  function updateRebark(e) {
    setRebarkText(e.target.value);
  }

  function submitRebark(e) {
    e.preventDefault();
    updateOriginal();
    submitPost(e, rebarkText, "rebark", post.id);
    setRebarkText("");
    setShowRebark(false);
  }

  async function updateOriginal() {
    try {
      const postRef = await db.collection("contents").doc(post.id);
      postRef.update({
        rebarkedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className={containerClass} id={post.id}>
      <PostMain post={post} view={view} />
      {originalPost && <PostMain post={originalPost} view={"rebarked"} />}
      <PostFooter
        displayComment={displayComment}
        addLike={addLike}
        commentNumber={commentNumber}
        likesNumber={likesNumber}
        rebarkNum={rebarkNum}
        displayRebark={displayRebark}
      />
      {showComment && (
        <CommentInput
          submitComment={submitComment}
          updateComment={updateComment}
          commentText={commentText}
        />
      )}

      {showRebark && (
        <RebarkModal
          post={post}
          updateRebark={updateRebark}
          submitRebark={submitRebark}
          rebarkText={rebarkText}
        />
      )}
    </div>
  );
};

export default Post;
