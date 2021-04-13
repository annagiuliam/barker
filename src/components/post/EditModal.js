import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import { AiOutlineClose } from "react-icons/ai";

const EditModal = (props) => {
  const { editText, closeEditModal, submitEdit, updateEdit } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="modal-main">
        <div className="btn-container-right">
          <AiOutlineClose
            className="icon icon-close"
            onClick={(e) => {
              e.stopPropagation();
              closeEditModal(false);
            }}
          />
        </div>
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
                <div className="btn-container-right">
                  <button type="submit" onClick={(e) => e.stopPropagation()}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditModal;
