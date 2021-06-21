import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const RebarkModal = (props) => {
  const { post, closeRebark, submitRebark } = props;

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeRebark} />
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
