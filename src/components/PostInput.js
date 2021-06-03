import React, { useContext, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import useStorage from "../hooks/useStorage";
import ProgressBar from "../components/reusables/ProgressBar";

const PostInput = () => {
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const { imageUrl } = useStorage(file);
  const types = ["image/png", "image/jpeg"];

  function updatePost(e) {
    setPostText(e.target.value);
  }

  function handleChange(e) {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      const errorMessage = "Please select an image (png or jpeg)";
      handleError(errorMessage);
    }
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
            submitPost(e, postText, "post", imageUrl);
            setPostText("");
          }}
        >
          <textarea
            className="post-textarea"
            onChange={updatePost}
            value={postText}
            placeholder="Bark what's on your mind!"
          ></textarea>
          <input type="file" onChange={handleChange} />
          {file && <ProgressBar file={file} setFile={setFile} />}
          {/* <button onClick={handleUpload}> upload image</button> */}
          <div className="input-btn-div">
            <button type="submit">Bark</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostInput;
