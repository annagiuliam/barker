import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const PostInput = () => {
  const { postText, submitPost, updatePost } = useContext(BarkerContext);
  return (
    <div className="post-input">
      <form onSubmit={submitPost}>
        <input type="text" onChange={updatePost} value={postText}></input>
        <button type="submit">Submit post</button>
      </form>
    </div>
  );
};
export default PostInput;
