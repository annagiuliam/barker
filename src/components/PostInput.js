import React, { useContext, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";

const PostInput = () => {
  const { currentUser, submitPost } = useContext(BarkerContext);
  const [postText, setPostText] = useState("");

  function updatePost(e) {
    setPostText(e.target.value);
  }
  return (
    <div className="post-input">
      <div className="user-info">
        <img alt="pic" src={currentUser.url} className="avatar-img"></img>
      </div>
      <div className="form-container">
        <form
          className="post-input-form"
          onSubmit={(e) => {
            submitPost(e, postText, "post");
            setPostText("");
          }}
        >
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
