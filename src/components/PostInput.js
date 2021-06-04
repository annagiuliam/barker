import React, { useContext, useState, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";
import useStorage from "../hooks/useStorage";
import ProgressBar from "../components/reusables/ProgressBar";

import { BiImageAdd } from "react-icons/bi";

const PostInput = () => {
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  let { imageUrl } = useStorage(file);
  const [url, setUrl] = useState(null);
  const types = ["image/png", "image/jpeg"];

  useEffect(() => {
    if (imageUrl) {
      setUrl(imageUrl);
    }
  }, [imageUrl]);

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
            setUrl(null);
          }}
        >
          <textarea
            className="post-textarea"
            onChange={updatePost}
            value={postText}
            placeholder="Bark what's on your mind!"
          ></textarea>

          {url && <img src={imageUrl} alt="uploaded" className="post-img" />}
          <div className="form-footer">
            <div className="image-upload">
              <label htmlFor="file-upload" className="custom-file-upload">
                <BiImageAdd id="image-upload-icon" />
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleChange}
                onClick={(e) => (e.target.value = null)}
              />
            </div>
            {file && <ProgressBar file={file} setFile={setFile} />}

            <div className="input-btn-div">
              <button type="submit">Bark</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostInput;
