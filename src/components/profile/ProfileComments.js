import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostMain from "../post/PostMain";
import Post from "../post/Post";
import firebase from "firebase/app";
import firebaseApp from "../../firebase/firebase";

const db = firebaseApp.firestore();

const ProfileComments = (props) => {
  // const { uid } = useParams();
  const { posts, uid, database } = props;

  const [commentedPosts, setCommentedPosts] = useState();
  //const [comments, setComments] = useState();
  // const commentedPosts = filter();
  // console.log(commentedPosts);

  useEffect(() => {
    //get the comments made by the profile
    async function getComments() {
      const snapshot = await db
        .collection("comments")
        .where("uid", "==", uid)
        .get();
      const comments = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(comments);
      addCommentsToPosts(comments);
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

    getComments();
  }, [posts, uid]);

  useEffect(() => {
    console.log(commentedPosts);
  });

  return (
    <div className="posts-container">
      {commentedPosts &&
        commentedPosts.map((post) => (
          <div className="post-w-comments-container">
            <Post post={post} key={post.id} type="comm-post" />
            {/* WARNING UNIQUE KEY */}
            <div>
              {post.commentData.map((data, i) => (
                <PostMain post={data} key={data.id} type={"comment"} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileComments;
