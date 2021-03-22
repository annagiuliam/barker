import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostMain from "../post/PostMain";

const ProfileComments = (props) => {
  // const { uid } = useParams();
  const { posts, uid, database } = props;

  const [commentedPosts, setCommentedPosts] = useState();
  const [comments, setComments] = useState();
  // const commentedPosts = filter();
  // console.log(commentedPosts);

  useEffect(() => {
    // !!!! RIPRENDI DA QUI https://overreacted.io/a-complete-guide-to-useeffect/
    async function getComments() {
      const snapshot = await database
        .collection("comments")
        .where("uid", "==", uid)
        .get();
      const comments = snapshot.docs.map((doc) => {
        return doc.data();
      });
      filter(comments);
    }

    getComments();
  }, []);

  useEffect(() => {
    // console.log(comments);
    console.log(commentedPosts);
  });

  function filter(comments) {
    console.log(comments);
    let filtered = [];
    let commPosts = [];
    let commPost = {};
    for (let i = 0; i < posts.length; i++) {
      filtered = comments.filter(
        (comment) => comment.originalPostId === posts[i].id
      );
      //console.log(filtered);
      if (filtered.length > 0) {
        commPost = { ...posts[i], comments: [...filtered] };
        // console.log(commPost);
        commPosts.push(commPost);
        // console.log(commPosts);
      }
    }
    setCommentedPosts(commPosts);
  }

  return <div className="posts-container">COMMENTI</div>;
};

export default ProfileComments;
