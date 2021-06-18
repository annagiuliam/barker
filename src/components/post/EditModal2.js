import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../post/InputForm";

const EditModal2 = (props) => {
  const { post, editText, closeEditModal, submitEdit, updateEdit } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeEditModal} />
        <div className="post-edit-container">
          <InputForm post={post} submitFunction={submitEdit} />
        </div>
      </section>
    </div>
  );
};

export default EditModal2;
