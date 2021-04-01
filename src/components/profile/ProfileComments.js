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
  const { uid, contents } = props;
  const { handleError } = useContext(BarkerContext);
  const [comments, setComments] = useState([]);

  const [commentedPosts, setCommentedPosts] = useState();

  useEffect(() => {
    //get the comments made by the profile

    //VERIFY COMMENT DISPLAY
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

    // create array with all commented posts and the comments made by the profile
    function addCommentsToPosts() {
      let filtered = [];
      let commPosts = [];
      let commPost = {};
      const posts = contents.filter(
        (item) =>
          item.type === "posts" || item.type === "rebark" || item.comments > 0
      );

      //look for the original posts among all posts
      for (let i = 0; i < posts.length; i++) {
        if (comments) {
          filtered = comments.filter(
            //look fot the comments that refer to the original post
            (comment) =>
              comment.uid === uid && comment.originalPostId === posts[i].id
          );
          if (filtered.length > 0) {
            //add the comments to the original posts
            commPost = { ...posts[i], commentData: [...filtered] };
            commPosts.push(commPost);
          }
        }
      }
      setCommentedPosts(commPosts);
    }

    return () => unsubscribe();
  }, [handleError, comments, contents, uid]);

  useEffect(() => {
    console.log(commentedPosts);
  });

  return (
    <div className="posts-container">
      {commentedPosts &&
        commentedPosts.map((post) => (
          <div className="post-w-comments-container" key={post.id}>
            <Post post={post} view={"comm-post"} />

            {post.commentData.map((data) => (
              <Post post={data} key={data.id} view={"comment"} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProfileComments;
