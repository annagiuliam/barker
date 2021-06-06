import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import CloseButton from "../reusables/CloseButton";

const EditModal = (props) => {
  const { post, editText, closeEditModal, submitEdit, updateEdit } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeEditModal} />
        <div className="post-edit-container">
          <div className="post-input">
            <div className="user-info">
              <img alt="pic" src={currentUser.url} className="avatar-img"></img>
            </div>
            <div className="form-container">
              <form className="post-input-form" onSubmit={submitEdit}>
                <textarea
                  className="post-textarea"
                  onChange={updateEdit}
                  onClick={(e) => e.stopPropagation()}
                  value={editText}
                ></textarea>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="uploaded"
                    className="post-img"
                  />
                )}

                {/* <div className="form-footer">
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
                </div> */}

                {/* <div className="btn-container-right">
                  <button type="submit" onClick={(e) => e.stopPropagation()}>
                    Submit
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditModal;
