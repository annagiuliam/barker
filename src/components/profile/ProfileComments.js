import React, { useEffect, useState, useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import Post from "../post/Post";

import firebaseApp from "../../firebase/firebase";

const db = firebaseApp.firestore();

const ProfileComments = (props) => {
  // const { uid } = useParams();
  const { uid, contents } = props;
  const { handleError } = useContext(BarkerContext);

  const [commentedPosts, setCommentedPosts] = useState();

  useEffect(() => {
    //get the comments made by the profile
    const unsubscribe = db
      .collection("contents")
      .where("type", "==", "comment")
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
    function addCommentsToPosts(comments) {
      let filtered = [];
      let commPosts = [];
      let commPost = {};

      //look for the original posts among the contents
      for (let i = 0; i < contents.length; i++) {
        if (comments) {
          filtered = comments.filter(
            //look fot the comments that refer to the original post
            (comment) =>
              comment.uid === uid && comment.originalPostId === contents[i].id
          );
          if (filtered.length > 0) {
            //add the comments to the original posts
            commPost = { ...contents[i], commentData: [...filtered] };
            commPosts.push(commPost);
          }
        }
      }
      setCommentedPosts(commPosts);
    }

    return () => unsubscribe();
  }, [handleError, contents, uid]);

  return (
    <div className="posts-container">
      {commentedPosts &&
        commentedPosts.map((post) => (
          <div className="post-w-comments-container" key={post.id}>
            <Post post={post} contents={contents} view={"comm-post"} />

            {post.commentData.map((data) => (
              <Post
                post={data}
                contents={contents}
                key={data.id}
                view={"comment"}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProfileComments;
