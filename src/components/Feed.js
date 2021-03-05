import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import Post from "./Post";

const Feed = () => {
  const { posts, userInfo } = useContext(BarkerContext);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
