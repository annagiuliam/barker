import React from "react";

import PostInput from "./PostInput";
import InputForm from "./post/InputForm";
import Feed from "./Feed";

const Main = (props) => {
  const { contents, posts, users } = props;
  return (
    <div className="center-container">
      {/* <PostInput /> */}
      <InputForm form={"input"} />
      <Feed contents={contents} posts={posts} users={users} />
    </div>
  );
};

export default Main;
