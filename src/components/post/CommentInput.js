import React from "react";

const PostInput = (props) => {
  const { submitComment, updateComment, commentText } = props;

  return (
    <div className="comment-input">
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={commentText}
          onClick={(e) => e.stopPropagation()}
          onChange={updateComment}
        ></input>
        <button onClick={(e) => e.stopPropagation()} type="submit">
          Reply
        </button>
      </form>
    </div>
  );
};

export default PostInput;
