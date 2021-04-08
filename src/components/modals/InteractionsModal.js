import React from "react";

import UserTile from "../UserTile";

const RebarkedByModal = (props) => {
  const { interactions, users } = props;
  return (
    <div className="extras-modal">
      <div className="extras-modal-main">
        <div className="modal-close-btn-container">
          <button onClick={props.onClick}>X</button>
        </div>
        <div className="tiles-container">
          {interactions.map((rebarker) => (
            <UserTile user={rebarker} users={users} key={rebarker.uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RebarkedByModal;
