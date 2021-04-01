import React from "react";

import PostInput from "./PostInput";
import Feed from "./Feed";

const Main = (props) => {
  const { contents, posts } = props;
  return (
    <div className="center-container">
      <PostInput />
      <Feed contents={contents} posts={posts} />
    </div>
  );
};

export default Main;
