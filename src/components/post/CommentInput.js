import React from "react";

const PostInput = (props) => {
  const { submitComment, updateComment, commentText } = props;

  return (
    <div className="comment-input-container">
      <form onSubmit={submitComment} className="comment-form">
        <textarea
          value={commentText}
          onClick={(e) => e.stopPropagation()}
          onChange={updateComment}
        ></textarea>
        <button onClick={(e) => e.stopPropagation()} type="submit">
          Reply
        </button>
      </form>
    </div>
  );
};

export default PostInput;
