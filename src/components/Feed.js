import React from "react";

import Post from "./post/Post";
//import CommentedPost from "./post/CommentedPost";

const Feed = (props) => {
  const { contents, posts } = props;

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} contents={contents} key={post.id} />
      ))}
      {/* {contents.map((post) =>
        post.type === "comment" ? (
          <CommentedPost post={post} contents={contents} key={post.id} />
        ) : (
          <Post post={post} contents={contents} key={post.id} />
        )
      )} */}
    </div>
  );
};

export default Feed;
