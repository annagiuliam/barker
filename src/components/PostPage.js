import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Post from "../components/post/Post";
import PostMain from "../components/post/PostMain";

import { FiArrowLeft } from "react-icons/fi";

import firebaseApp from "../firebase/firebase";
const db = firebaseApp.firestore();

const PostPage = (props) => {
  const { posts, handleError } = useContext(BarkerContext);
  const { id } = useParams();
  const { history } = props;
  const [comments, setComments] = useState(null);
  const post = posts.find((post) => post.id === id);
  console.log(history);

  useEffect(() => {
    //get the comments made by the profile
    function getComments() {
      const unsubscribe = db
        .collection("comments")
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
            handleError(error);
          }
        );

      return unsubscribe;
    }

    const unsubscribe = getComments();

    return () => {
      unsubscribe();
    };
  }, [handleError, id]);
  return (
    <div className="center-container">
      <div className="arrow-left-container">
        <FiArrowLeft id="arrow-left" onClick={() => history.goBack()} />
      </div>
      <div className="post-w-comments-container" key={post.id}>
        <Post post={post} view={"comm-post"} />
        {comments &&
          comments.map((comment) => (
            <PostMain post={post} view={"comment"} key={comment.id} />
          ))}
      </div>
    </div>
  );
};

export default PostPage;
