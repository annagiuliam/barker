import React, { useEffect, useState, useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { useParams } from "react-router-dom";
import PostMain from "../post/PostMain";
import Post from "../post/Post";
//import firebase from "firebase/app";
import firebaseApp from "../../firebase/firebase";

const db = firebaseApp.firestore();

const ProfileComments = (props) => {
  // const { uid } = useParams();
  const { posts, uid } = props;
  const { handleError } = useContext(BarkerContext);

  const [commentedPosts, setCommentedPosts] = useState();

  useEffect(() => {
    //get the comments made by the profile
    function getComments() {
      const unsubscribe = db
        .collection("comments")
        .where("uid", "==", uid)
        .orderBy("timestamp", "asc")
        .onSnapshot(
          (snapshot) => {
            const comments = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            addCommentsToPosts(comments);
          },
          (error) => {
            handleError(error);
          }
        );

      return unsubscribe;
    }

    // create array with all commented posts and the comments made by the profile
    function addCommentsToPosts(comments) {
      let filtered = [];
      let commPosts = [];
      let commPost = {};
      //look for the original posts among all posts
      for (let i = 0; i < posts.length; i++) {
        filtered = comments.filter(
          //look fot the comments that refer to the original post
          (comment) => comment.originalPostId === posts[i].id
        );
        if (filtered.length > 0) {
          //add the comments to the original posts
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
            <Post post={post} view={"comm-post"} />

            {post.commentData.map((data, i) => (
              <PostMain post={data} key={data.id} view={"comment"} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProfileComments;
