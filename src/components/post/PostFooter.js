import React from "react";
import { FaRegComment, FaPaw, FaRetweet } from "react-icons/fa";

const PostFooter = (props) => {
  const {
    displayComment,
    displayRebark,
    commentNumber,
    likesNumber,
    rebarkNum,
    addLike,
  } = props;

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
      <div className="post-icon-div">
        <FaRetweet
          className="post-icon"
          title="Rebark"
          onClick={displayRebark}
        />
        <div>{rebarkNum}</div>
      </div>
    </div>
  );
};

export default PostFooter;
