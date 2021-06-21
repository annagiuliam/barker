import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const RebarkModal = (props) => {
  const { post, closeRebarkModal, submitRebark } = props;

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeRebarkModal} />
        <div className="post-edit-container">
          <InputForm
            post={post}
            submitFunction={submitRebark}
            postType={"rebark"}
            form={"rebark"}
          />
        </div>
      </section>
    </div>
  );
};

export default RebarkModal;
