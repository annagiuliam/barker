import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { useParams } from "react-router-dom";

import Post from "./post/Post";
import ArrowLeft from "./reusables/ArrowLeft";

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
    // started another onSnapshot bc the one of context collects comments in descending order

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

  useEffect(() => {
    if (!post) {
      history.goBack();
    }
  }, [post, history]);

  return (
    <div className="center-container">
      <ArrowLeft onClick={() => history.goBack()} />
      {post && (
        <div className="post-w-comments-container" key={post.id}>
          <Post
            post={post}
            contents={contents}
            view={"comm-post"}
            users={users}
          />
          {comments &&
            comments.map((comment) => (
              <Post
                post={comment}
                contents={contents}
                view={"comment"}
                key={comment.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
