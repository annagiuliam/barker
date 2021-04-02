import React from "react";

import Post from "./Post";

const CommentedPost = (props) => {
  const { post, contents } = props;
  const commentedPost = contents.find((ele) => ele.id === post.originalPostId);

  return (
    <div className="post-w-comments-container">
      <Post post={commentedPost} contents={contents} view={"comm-post"} />
      <Post post={post} contents={contents} view={"comment"} />
    </div>
  );
};

export default CommentedPost;
