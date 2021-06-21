import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const EditModal = (props) => {
  const { post, closeEditModal, submitEdit } = props;

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeEditModal} />
        <div className="post-edit-container">
          <InputForm
            post={post}
            submitFunction={submitEdit}
            postType={post.type}
            form={"edit"}
          />
        </div>
      </section>
    </div>
  );
};

export default EditModal;
