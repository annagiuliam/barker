import React, { useContext, useState, useEffect } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import useStorage from "../../hooks/useStorage";

import ProgressBar from "./ProgressBar";
import CloseButton from "./CloseButton";
import PostMain from "../post/PostMain";

import { BiImageAdd } from "react-icons/bi";

const InputForm = (props) => {
  const { post, postType, form, submitFunction } = props;

  const { currentUser, handleError, submitPost } = useContext(BarkerContext);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);

  let { imageUrl } = useStorage(file);
  const [url, setUrl] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const fileInputId = `file-${form}`;
  const submit = submitFunction ? submitFunction : submitPost;
  const wrapperClass = form === "input" ? "form-wrapper input" : "form-wrapper";

  useEffect(() => {
    if (form === "edit") {
      if (post) {
        setPostText(post.text);
      }
      if (post.imageUrl && !imageUrl) {
        setUrl(post.imageUrl);
      } else if (imageUrl) {
        setUrl(imageUrl);
      }
    } else {
      if (imageUrl) {
        setUrl(imageUrl);
      }
    }
  }, [imageUrl, post, form]);

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

  function discardImage(e) {
    e.stopPropagation();
    setUrl(null);
  }

  return (
    <div className={wrapperClass}>
      <div className="left-side">
        <div className="user-info">
          <img alt="pic" src={currentUser.url} className="avatar-img"></img>
        </div>
      </div>

      <div className="form-container">
        <form
          className="post-input-form"
          onSubmit={(e) => {
            e.stopPropagation();
            submit(e, postText, postType, imageUrl);
            setPostText("");
            setUrl(null);
          }}
        >
          <textarea
            className="post-textarea"
            onChange={updatePost}
            onClick={(e) => e.stopPropagation()}
            value={postText}
            placeholder="Bark what's on your mind!"
          ></textarea>

          {url && (
            <div className="image-container">
              <img src={url} alt="uploaded" className="post-img" />
              <CloseButton
                btnClass={"discard-btn-container"}
                onClick={discardImage}
              />
            </div>
          )}

          {postType === "rebark" && <PostMain post={post} view="rebarked" />}
          <div className="form-footer">
            <div className="image-input" onClick={(e) => e.stopPropagation()}>
              <label htmlFor={fileInputId} className="custom-file-upload">
                <BiImageAdd id="image-upload-icon" />
              </label>
              <input
                id={fileInputId}
                type="file"
                onChange={handleChange}
                onClick={(e) => {
                  e.stopPropagation();
                  e.target.value = null;
                }}
              />
            </div>
            {file && <ProgressBar file={file} setFile={setFile} />}

            <div className="input-btn-div">
              <button type="submit" onClick={(e) => e.stopPropagation()}>
                Bark
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default InputForm;
