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
  const { post, type } = props;
  const [commentText, setCommentText] = useState("");
  const [rebarkText, setRebarkText] = useState("");
  const { posts, userInfo, handleError, submitPost } = useContext(
    BarkerContext
  );
  const [showComment, setShowComment] = useState(false);
  const [showRebark, setShowRebark] = useState(false);
  const [originalPost, setOriginalPost] = useState(null);

  const commentNumber = post.comments > 0 ? post.comments : "";
  const likesNumber = post.likedBy.length > 0 ? post.likedBy.length : "";
  const rebarkNum = post.rebarkedBy.length > 0 ? post.rebarkedBy.length : "";
  const containerClass = type ? `${type}-container` : "post-container";

  useEffect(() => {
    function findOriginalPost() {
      let original;
      if (post.type === "rebark") {
        original = posts.find((ele) => ele.id === post.originalPostId);
      }
      setOriginalPost(original);
    }

    findOriginalPost();
  });

  function displayComment() {
    setShowComment(true);
  }

  function updateComment(e) {
    setCommentText(e.target.value);
  }
  function submitComment(e) {
    e.preventDefault();
    addComment(e);
  }

  // cCAMBIA, GESTISCI COME REBARK
  async function addComment(e) {
    try {
      const postRef = await db.collection("posts").doc(post.id);
      await postRef.update({
        comments: firebase.firestore.FieldValue.increment(1),
      });
      setShowComment(false);
      await submitPost(e, commentText, "comment", "comments", post.id);
      setCommentText("");
    } catch (error) {
      handleError(error);
    }
  }

  function addLike() {
    const postRef = db.collection("posts").doc(post.id);
    postRef
      .update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(userInfo.uid),
      })
      .catch((error) => console.log("error", error.message));
  }

  function displayRebark() {
    // don't open rebarked modal if user has already rebarked this post
    if (!post.rebarkedBy.includes(userInfo.uid)) {
      setShowRebark(true);
    }
  }

  function updateRebark(e) {
    setRebarkText(e.target.value);
  }

  function submitRebark(e) {
    e.preventDefault();
    updateOriginal();
    submitPost(e, rebarkText, "rebark", "posts", post.id);
    setRebarkText("");
    setShowRebark(false);
  }

  function updateOriginal() {
    const postRef = db.collection("posts").doc(post.id);
    postRef
      .update({
        rebarkedBy: firebase.firestore.FieldValue.arrayUnion(userInfo.uid),
        //type: "rebark",
      })
      .catch((error) => console.log("error", error.message));
  }
  return (
    <div className={containerClass} id={post.id}>
      <PostMain post={post} type={"post"} />
      {originalPost && <PostMain post={originalPost} type={"rebark"} />}
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
