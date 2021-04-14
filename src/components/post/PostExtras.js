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
      let newArr = [];
      post.rebarkedBy.forEach((rebarker) => {
        for (let i = 0; i < users.length; i++) {
          if (rebarker === users[i].uid) {
            newArr.push(users[i]);
          }
        }
      });
      setRebarkedBy(newArr);
    }
  }, [post.rebarkedBy, users]);

  useEffect(() => {
    if (post.likedBy) {
      let newArr = [];
      post.likedBy.forEach((liker) => {
        for (let i = 0; i < users.length; i++) {
          if (liker === users[i].uid) {
            newArr.push(users[i]);
          }
        }
      });
      setLikedBy(newArr);
    }
  }, [post.likedBy, users]);

  return (
    <div className="extras-container">
      <ul className="extras">
        {rebarkNum > 0 && (
          <li
            onClick={(e) => {
              e.stopPropagation();
              setShowRebarkedByModal(true);
            }}
          >
            {rebarkNum} rebarks
          </li>
        )}
        {likesNumber > 0 && (
          <li
            onClick={(e) => {
              e.stopPropagation();
              setShowLikedByModal(true);
            }}
          >
            {likesNumber} likes
          </li>
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
