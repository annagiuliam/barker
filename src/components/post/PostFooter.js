import React from "react";
import { FaRegComment, FaPaw } from "react-icons/fa";

const PostFooter = (props) => {
  const { displayComment, commentNumber, likesNumber, addLike } = props;
  return (
    <div className="post-footer">
      <div className="post-icon-div">
        <FaRegComment
          className="post-icon"
          title="Reply"
          onClick={displayComment}
        />
        <div>{commentNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaPaw className="post-icon" title="Like" onClick={addLike} />
        <div>{likesNumber}</div>
      </div>
    </div>
  );
};

export default PostFooter;
