import React from "react";
import { FaRegComment, FaPaw } from "react-icons/fa";

const PostFooter = (props) => {
  const { displayComment, commentNumber, likesNumber } = props;
  return (
    <div className="post-footer">
      <div className="post-icon-div">
        <FaRegComment
          className="post-icon"
          onClick={displayComment}
          title="Reply"
        />
        <div>{commentNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaPaw className="post-icon" title="Like" />
        <div>{likesNumber}</div>
      </div>
    </div>
  );
};

export default PostFooter;
