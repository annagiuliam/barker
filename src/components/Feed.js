import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import firebaseApp from "../firebase/firebase";

import Post from "./post/Post";

const db = firebaseApp.firestore();

const Feed = () => {
  const { userInfo, handleError, storeContents } = useContext(BarkerContext);
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("contents")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          const fetchedContents = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setContents(fetchedContents);
          // const comments = fetchedContents
          //   .filter((item) => item.type === "comment")
          //   .sort((x, y) => x.timestamp - y.timestamp);

          // setComments(comments);

          const posts = fetchedContents.filter(
            (item) => item.type === "post" || item.type === "rebark"
          );
          setPosts(posts);
          //storeContents(fetchedContents);
        },
        (error) => {
          console.log(error.code);
          handleError(error);
        }
      );

    return () => unsubscribe();
  }, [handleError]);
  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} contents={contents} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
