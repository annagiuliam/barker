import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";

const CommentModal = (props) => {
  const { post, submitComment, closeCommentModal } = props;
  return (
    <div className="modal">
      <section className="modal-main">
        <div className="post-edit-container">
          <InputForm
            post={post}
            // submitFunction={submitRebark}
            postType={"rebark"}
            form={"rebark"}
          />
        </div>
      </section>
    </div>
  );
};

export default CommentModal;
