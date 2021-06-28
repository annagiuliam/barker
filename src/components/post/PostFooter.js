import React from "react";
import { FaRegComment, FaPaw, FaRetweet } from "react-icons/fa";

const PostFooter = (props) => {
  const {
    likedByUser,
    rebarkedByUser,
    openCommentModal,
    openRebarkModal,
    commentNumber,
    likesNumber,
    rebarkNum,
    clickLike,
  } = props;

  // const likeActive = likedByUser ? "footer-icon active" : "footer-icon";
  // const rebarkActive = rebarkedByUser ? "footer-icon active" : "footer-icon";

  const likeActive = likedByUser ? "active" : "";
  const rebarkActive = rebarkedByUser ? "active" : "";

  return (
    <div className="post-footer">
      <div className="post-icon-div">
        <FaRegComment
          className="footer-icon"
          title="Reply"
          onClick={(e) => {
            e.stopPropagation();
            openCommentModal();
          }}
        />
        <div>{commentNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaPaw
          className={`footer-icon ${likeActive}`}
          title="Like"
          onClick={(e) => {
            e.stopPropagation();
            clickLike();
          }}
        />
        <div className={likeActive}>{likesNumber}</div>
      </div>
      <div className="post-icon-div">
        <FaRetweet
          className={`footer-icon ${rebarkActive}`}
          title="Rebark"
          onClick={(e) => {
            e.stopPropagation();
            openRebarkModal();
          }}
        />
        <div className={rebarkActive}>{rebarkNum}</div>
      </div>
    </div>
  );
};

export default PostFooter;
