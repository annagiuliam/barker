import React from "react";

import CloseButton from "../reusables/CloseButton";
import InputForm from "../reusables/InputForm";
import PostMain from "../post/PostMain";

const CommentModal = (props) => {
  const { post, submitComment, closeCommentModal } = props;
  return (
    <div className="modal">
      <section className="input-modal-main">
        <CloseButton
          onClick={closeCommentModal}
          btnClass={"close-btn-bottom"}
        />
        {/* original post user is replying to */}
        <PostMain post={post} modal={"comment"} />

        <InputForm
          post={post}
          submitFunction={submitComment}
          postType={"comment"}
          form={"comment"}
        />
      </section>
    </div>
  );
};

export default CommentModal;
