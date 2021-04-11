import React from "react";

const CloseButton = (props) => {
  return (
    <div className="modal-close-btn-container">
      <button onClick={props.onClick}>X</button>
    </div>
  );
};

export default CloseButton;
