import React from "react";

import UserTile from "../UserTile";
import CloseButton from "../reusables/CloseButton";

const RebarkedByModal = (props) => {
  const { interactions, users } = props;
  return (
    <div className="extras-modal">
      <div className="extras-modal-main">
        <CloseButton onClick={props.onClick} />
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
