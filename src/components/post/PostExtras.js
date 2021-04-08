import React, { useState, useEffect } from "react";

import InteractionsModal from "../modals/InteractionsModal";

const PostExtras = (props) => {
  const { post, users, likesNumber, rebarkNum } = props;
  const [showRebarkedByModal, setShowRebarkedByModal] = useState(false);
  const [showLikeddByModal, setShowLikedByModal] = useState(false);
  const [rebarkedBy, setRebarkedBy] = useState(null);
  const [likedBy, setLikedBy] = useState(null);

  useEffect(() => {
    if (post.rebarkedBy) {
      let newArr;
      post.rebarkedBy.forEach((rebarker) => {
        newArr = users.filter((user) => rebarker === user.uid);
      });
      setRebarkedBy(newArr);
    }
  }, [post.rebarkedBy, users]);

  useEffect(() => {
    if (post.likedBy) {
      let newArr;
      post.likedBy.forEach((liker) => {
        newArr = users.filter((user) => liker === user.uid);
      });
      setLikedBy(newArr);
    }
  }, [post.likedBy, users]);

  useEffect(() => {
    // console.log(post.rebarkedBy);
    //console.log(likedBy);
  });

  return (
    <div className="extras-container">
      <ul className="extras">
        {rebarkNum > 0 && (
          <li onClick={() => setShowRebarkedByModal(true)}>
            {rebarkNum} rebarks
          </li>
        )}
        {likesNumber > 0 && (
          <li onClick={() => setShowLikedByModal(true)}>{likesNumber} likes</li>
        )}
      </ul>
      {showRebarkedByModal && (
        <InteractionsModal
          onClick={() => setShowRebarkedByModal(false)}
          interactions={rebarkedBy}
          users={users}
        />
      )}

      {showLikeddByModal && (
        <InteractionsModal
          onClick={() => setShowLikedByModal(false)}
          interactions={likedBy}
          users={users}
        />
      )}
    </div>
  );
};

export default PostExtras;
