import React, { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import PostFooter from "./PostFooter";
import CommentInput from "./CommentInput";
import PostExtras from "./PostExtras";

import CommentRebark from "../modals/CommentModal";
import RebarkModal from "../modals/RebarkModal";
import EditModal from "../modals/EditModal";
import firebase from "firebase/app";
import { db } from "../../firebase/firebase";

const Post = (props) => {
  const { contents, post, view, users } = props;
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);

  const [commentText, setCommentText] = useState("");

  const [showComment, setShowComment] = useState(false);
  const [showRebark, setShowRebark] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [originalPost, setOriginalPost] = useState(null);
  const [likedByUser, setLikedByUser] = useState(false);
  const [rebarkedByUser, setRebarkedByUser] = useState(false);

  const commentNumber = post.comments > 0 ? post.comments : "";
  const likesNumber = post.likedBy.length > 0 ? post.likedBy.length : "";
  const rebarkNum = post.rebarkedBy.length > 0 ? post.rebarkedBy.length : "";
  const containerClass = view
    ? `${view}-container clickable`
    : "post-container clickable";

  const history = useHistory();
  const redirect = (e) => {
    history.push({
      pathname: `/post/${post.id}`,
    });
  };

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

  useEffect(() => {
    //check if current user liked or rebarked this post
    if (post.likedBy.length > 0) {
      if (post.likedBy.includes(currentUser.uid)) {
        setLikedByUser(true);
      }
    }

    if (post.rebarkedBy.length > 0) {
      if (post.rebarkedBy.includes(currentUser.uid)) {
        setRebarkedByUser(true);
      }
    } else setRebarkedByUser(false);
  }, [currentUser.uid, post.likedBy, post.rebarkedBy]);

  function updateComment(e) {
    setCommentText(e.target.value);
  }

  function submitComment(e) {
    e.preventDefault();
    incrementCommentNumber();
    submitPost(e, commentText, "comment", null, post.id);
    setCommentText("");
    setShowComment(false);
  }

  async function incrementCommentNumber() {
    const postRef = db.collection("contents").doc(post.id);
    postRef
      .update({
        comments: firebase.firestore.FieldValue.increment(1),
      })
      .catch((error) => handleError(error));
  }

  function clickLike() {
    const postRef = db.collection("contents").doc(post.id);
    if (post.likedBy.includes(currentUser.uid)) {
      postRef
        .update({
          likedBy: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
        })
        .catch((error) => handleError(error));
      setLikedByUser(false);
    } else {
      postRef
        .update({
          likedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        })
        .catch((error) => handleError(error));
    }
  }

  function openRebarkModal() {
    // don't open rebarked modal if user has already rebarked this post
    if (!post.rebarkedBy.includes(currentUser.uid)) {
      setShowRebark(true);
    }
  }

  function submitRebark(e, postText, postType, imageUrl) {
    e.preventDefault();
    updateOriginal();
    submitPost(e, postText, postType, imageUrl, post.id);
    setShowRebark(false);
  }

  function closeRebarkModal() {
    setShowRebark(false);
  }

  function openEditModal() {
    setShowEdit(true);
  }

  function closeEditModal() {
    setShowEdit(false);
  }

  function displayComment() {
    setShowComment(true);
  }

  function openCommentModal() {
    setShowComment(true);
  }

  function closeCommentModal() {
    setShowComment(false);
  }

  function submitEdit(e, editedText, postType, imageUrl) {
    e.preventDefault();
    updatePost(editedText, imageUrl);
    setShowEdit(false);
  }

  async function updatePost(editedText, imageUrl) {
    try {
      const postRef = await db.collection("contents").doc(post.id);
      await postRef.update({
        text: editedText,
        imageUrl: imageUrl,
      });
    } catch (error) {
      handleError(error);
    }
  }

  function updateOriginal() {
    const postRef = db.collection("contents").doc(post.id);
    postRef
      .update({
        rebarkedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      })
      .catch((error) => handleError(error));
  }

  async function deletePost() {
    try {
      const postRef = await db.collection("contents").doc(post.id);
      let original;
      if (post.type === "rebark" || post.type === "comment") {
        original = contents.find((ele) => ele.id === post.originalPostId);
        const originalRef = await db.collection("contents").doc(original.id);
        if (post.type === "rebark") {
          await originalRef.update({
            rebarkedBy: firebase.firestore.FieldValue.arrayRemove(
              currentUser.uid
            ),
          });
          setRebarkedByUser(false);
        } else {
          await originalRef.update({
            comments: firebase.firestore.FieldValue.increment(-1),
          });
        }
      }
      postRef.delete();
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className={containerClass} id={post.id} onClick={redirect}>
      <PostMain
        post={post}
        view={view}
        deletePost={deletePost}
        openEditModal={openEditModal}
      />
      {originalPost && <PostMain post={originalPost} view={"rebarked"} />}
      {(likesNumber || rebarkNum) && users && (
        <PostExtras
          users={users}
          post={post}
          likesNumber={likesNumber}
          rebarkNum={rebarkNum}
        />
      )}
      <PostFooter
        displayComment={displayComment}
        clickLike={clickLike}
        commentNumber={commentNumber}
        likesNumber={likesNumber}
        rebarkNum={rebarkNum}
        openRebarkModal={openRebarkModal}
        likedByUser={likedByUser}
        rebarkedByUser={rebarkedByUser}
      />

      {/* riprendi da qui, apri modal invece di input */}
      {/* {showComment && (
        <CommentInput
          submitComment={submitComment}
          updateComment={updateComment}
          commentText={commentText}
        />
      )} */}

      {showComment && (
        <CommentRebark
          post={post}
          submitComment={submitComment}
          closeCommentModal={closeCommentModal}
        />
      )}

      {showRebark && (
        <RebarkModal
          post={post}
          submitRebark={submitRebark}
          closeRebarkModal={closeRebarkModal}
        />
      )}

      {showEdit && (
        <EditModal
          post={post}
          submitEdit={submitEdit}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default Post;
