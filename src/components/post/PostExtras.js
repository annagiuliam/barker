import React, { useState } from "react";

import RebarkedByModal from "../modals/RebarkedByModal";

const PostExtras = (props) => {
  const { post, users, likesNumber, rebarkNum } = props;

  const [showRebarkedByModal, setShowRebarkedByModal] = useState(false);

  return (
    <div className="extras-container">
      <ul className="extras">
        {rebarkNum > 0 && (
          <li onClick={() => setShowRebarkedByModal(true)}>
            {rebarkNum} rebarks
          </li>
        )}
        {likesNumber > 0 && (
          <li onClick={() => alert("hello")}>{likesNumber} likes</li>
        )}
      </ul>
      {showRebarkedByModal && <RebarkedByModal />}
    </div>
  );
};

export default PostExtras;
