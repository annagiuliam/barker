import React, { useEffect, useState, useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { useParams } from "react-router-dom";
import PostMain from "../post/PostMain";
import Post from "../post/Post";
import firebase from "firebase/app";
import firebaseApp from "../../firebase/firebase";

const db = firebaseApp.firestore();

const ProfileComments = (props) => {
  // const { uid } = useParams();
  const { posts, uid, database } = props;
  const { handleError } = useContext(BarkerContext);

  const [commentedPosts, setCommentedPosts] = useState();
  //const [comments, setComments] = useState();
  // const commentedPosts = filter();
  // console.log(commentedPosts);

  useEffect(() => {
    //get the comments made by the profile
    // async function getComments() {
    //   const snapshot = await db
    //     .collection("comments")
    //     .where("uid", "==", uid)
    //     .get();
    //   const comments = snapshot.docs.map((doc) => {
    //     return { id: doc.id, ...doc.data() };
    //   });
    //   console.log(comments);
    //   addCommentsToPosts(comments);
    // }
    function getComments() {
      const unsubscribe = db
        .collection("comments")
        .where("uid", "==", uid)
        //ORDER IN ASCENDING
        .orderBy("timestamp", "asc")
        .onSnapshot(
          (snapshot) => {
            const comments = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            addCommentsToPosts(comments);
          },
          (error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
            const displayedError = `Error code: ${errorCode}. ${errorMessage}`;
            handleError(error);
            //console.log(displayedError);
          }
        );

      return unsubscribe;
    }

    // add the comment data to the original post
    function addCommentsToPosts(comments) {
      let filtered = [];
      let commPosts = [];
      let commPost = {};
      for (let i = 0; i < posts.length; i++) {
        filtered = comments.filter(
          (comment) => comment.originalPostId === posts[i].id
        );
        if (filtered.length > 0) {
          commPost = { ...posts[i], commentData: [...filtered] };
          commPosts.push(commPost);
        }
      }
      setCommentedPosts(commPosts);
    }

    const unsubscribe = getComments();

    return () => {
      unsubscribe();
    };
  }, [handleError, posts, uid]);

  useEffect(() => {
    //console.log(commentedPosts);
  });

  return (
    <div className="posts-container">
      {commentedPosts &&
        commentedPosts.map((post, i) => (
          <div className="post-w-comments-container" key={post.id}>
            <Post post={post} type="comm-post" />
            {/* WARNING UNIQUE KEY */}

            {post.commentData.map((data, i) => (
              <PostMain post={data} key={data.id} type={"comment"} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProfileComments;
