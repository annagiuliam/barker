import React, { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import PostFooter from "./PostFooter";
import CommentInput from "./CommentInput";
import PostExtras from "./PostExtras";

import RebarkModal from "./RebarkModal";
import EditModal from "./EditModal";

import firebase from "firebase/app";
import { db } from "../../firebase/firebase";

const Post = (props) => {
  const { contents, post, view, users } = props;
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);

  const [commentText, setCommentText] = useState("");
  const [rebarkText, setRebarkText] = useState("");
  const [editText, setEditText] = useState(post.text);

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
    }
  }, [currentUser.uid, post.likedBy, post.rebarkedBy]);

  function displayComment() {
    setShowComment(true);
  }

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

  function addLike() {
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
    submitPost(e, rebarkText, "rebark", null, post.id);
    setRebarkText("");
    setShowRebark(false);
  }

  function closeRebark() {
    setShowRebark(false);
  }

  function updateEdit(e) {
    setEditText(e.target.value);
  }
  function openEditModal() {
    setShowEdit(true);
  }

  function closeEditModal() {
    setShowEdit(false);
  }
  function submitEdit(e) {
    e.preventDefault();
    updatePost();
    setShowEdit(false);
  }

  async function updatePost() {
    try {
      const postRef = await db.collection("contents").doc(post.id);
      await postRef.update({
        text: editText,
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
        addLike={addLike}
        commentNumber={commentNumber}
        likesNumber={likesNumber}
        rebarkNum={rebarkNum}
        displayRebark={displayRebark}
        likedByUser={likedByUser}
        rebarkedByUser={rebarkedByUser}
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
          closeRebark={closeRebark}
        />
      )}

      {showEdit && (
        <EditModal
          editText={editText}
          updateEdit={updateEdit}
          submitEdit={submitEdit}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default Post;
