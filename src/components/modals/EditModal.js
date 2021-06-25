import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const EditModal = (props) => {
  const { post, closeEditModal, submitEdit } = props;

  return (
    <div className="modal">
      <section className="input-modal-main">
        <CloseButton onClick={closeEditModal} btnClass={"close-btn-bottom"} />

        <InputForm
          post={post}
          submitFunction={submitEdit}
          postType={post.type}
          form={"edit"}
        />
      </section>
    </div>
  );
};

export default EditModal;
