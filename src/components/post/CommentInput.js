import React from "react";

const PostInput = (props) => {
  const { submitComment, updateComment, commentText } = props;

  return (
    <div className="comment-input">
      <form onSubmit={submitComment}>
        <input type="text" onChange={updateComment} value={commentText}></input>
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default PostInput;
