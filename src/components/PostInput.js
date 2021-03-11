import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const PostInput = () => {
  const { userInfo, postText, submitPost, updatePost } = useContext(
    BarkerContext
  );
  return (
    <div className="post-input">
      <div className="user-info">
        <img alt="pic" src={userInfo.url} className="avatar-img"></img>
      </div>
      <div className="form-container">
        <form className="post-input-form" onSubmit={submitPost}>
          <textarea
            onChange={updatePost}
            value={postText}
            placeholder="Bark what's on your mind!"
          ></textarea>
          <div className="input-btn-div">
            <button type="submit">Bark</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostInput;
