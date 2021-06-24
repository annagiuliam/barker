import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const RebarkModal = (props) => {
  const { post, closeRebarkModal, submitRebark, hashedText } = props;

  return (
    <div className="modal">
      <section className="input-modal-main">
        <CloseButton onClick={closeRebarkModal} btnClass={"close-btn-bottom"} />
        {/* <div className="post-edit-container"> */}
        <div className="input-modal-content">
          <InputForm
            post={post}
            submitFunction={submitRebark}
            postType={"rebark"}
            form={"rebark"}
            // hashedText={hashedText}
          />
        </div>
      </section>
    </div>
  );
};

export default RebarkModal;
