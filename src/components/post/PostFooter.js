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
          className="icon"
          title="Reply"
          onClick={(e) => {
            e.stopPropagation();
            displayComment();
          }}
        />
        <div>{commentNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaPaw
          className="icon"
          title="Like"
          onClick={(e) => {
            e.stopPropagation();
            addLike();
          }}
        />
        <div>{likesNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaRetweet
          className="icon"
          title="Rebark"
          onClick={(e) => {
            e.stopPropagation();
            displayRebark();
          }}
        />
        <div>{rebarkNum}</div>
      </div>
    </div>
  );
};

export default PostFooter;
