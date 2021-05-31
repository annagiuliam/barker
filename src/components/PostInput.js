import React, { useContext, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import firebaseApp from "../firebase/firebase";
const storage = firebaseApp.storage();

const PostInput = () => {
  const { currentUser, handleError, submitPost } = useContext(BarkerContext);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  function updatePost(e) {
    setPostText(e.target.value);
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  function handleUpload(e) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        handleError(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          });
      }
    );
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
            handleUpload(e); //??????
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
