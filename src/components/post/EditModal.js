import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

const EditModal = (props) => {
  const { editText, closeEditModal, submitEdit, updateEdit } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="modal-main">
        <div className="modal-close-btn-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeEditModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="post-input">
          <div className="user-info">
            <img alt="pic" src={currentUser.url} className="avatar-img"></img>
          </div>
          <div className="form-container">
            <form className="post-input-form" onSubmit={submitEdit}>
              <textarea
                onChange={updateEdit}
                onClick={(e) => e.stopPropagation()}
                value={editText}
              ></textarea>
              <div className="input-btn-div">
                <button type="submit" onClick={(e) => e.stopPropagation()}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditModal;
