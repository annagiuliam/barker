import React from "react";

// import PostInput from "./PostInput";
import InputForm from "./reusables/InputForm";
import Feed from "./Feed";

const Main = (props) => {
  const { contents, posts, users } = props;
  return (
    <div className="center-container">
      {/* <PostInput /> */}
      <InputForm form={"input"} postType={"post"} />
      <Feed contents={contents} posts={posts} users={users} />
    </div>
  );
};

export default Main;
