import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";

import Post from "./post/Post";

const Feed = (props) => {
  const { contents, posts } = props;
  const { handleError } = useContext(BarkerContext);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} contents={contents} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
