import React from "react";
import { FaRegComment, FaPaw, FaRetweet } from "react-icons/fa";

const PostFooter = (props) => {
  const {
    likedByUser,
    rebarkedByUser,
    displayComment,
    displayRebark,
    commentNumber,
    likesNumber,
    rebarkNum,
    addLike,
  } = props;

  const likeActive = likedByUser ? "icon active" : "icon";
  const rebarkActive = rebarkedByUser ? "icon active" : "icon";

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
          className={likeActive}
          title="Like"
          onClick={(e) => {
            e.stopPropagation();
            addLike();
          }}
        />
        <div className={likeActive}>{likesNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaRetweet
          className={rebarkActive}
          title="Rebark"
          onClick={(e) => {
            e.stopPropagation();
            displayRebark();
          }}
        />
        <div className={rebarkActive}>{rebarkNum}</div>
      </div>
    </div>
  );
};

export default PostFooter;
