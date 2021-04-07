import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { useParams } from "react-router-dom";

import Post from "../components/post/Post";

import { FiArrowLeft } from "react-icons/fi";

import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();

const PostPage = (props) => {
  const { handleError } = useContext(BarkerContext);
  const { id } = useParams();
  const { history, contents, users } = props;
  const [comments, setComments] = useState(null);
  const post = contents.find((post) => post.id === id);

  useEffect(() => {
    //get the all comments to the post

    const unsubscribe = db
      .collection("contents")
      .where("type", "==", "comment")
      .where("originalPostId", "==", id)
      .orderBy("timestamp", "asc")
      .onSnapshot(
        (snapshot) => {
          const comments = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setComments(comments);
        },
        (error) => {
          console.log(error);
          handleError(error);
        }
      );

    return () => unsubscribe();
  }, [handleError, id]);
  return (
    <div className="center-container">
      <div className="arrow-left-container">
        <FiArrowLeft id="arrow-left" onClick={() => history.goBack()} />
      </div>
      <div className="post-w-comments-container" key={post.id}>
        <Post
          post={post}
          contents={contents}
          view={"comm-post"}
          users={users}
        />
        {comments &&
          comments.map((comment) => (
            <Post post={comment} view={"comment"} key={comment.id} />
          ))}
      </div>
    </div>
  );
};

export default PostPage;
