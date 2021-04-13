import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton = (props) => {
  return (
    // <div className="modal-close-btn-container">
    //   <button onClick={props.onClick}>X</button>
    // </div>
    <div className="btn-container-right">
      <AiOutlineClose
        className="icon icon-close"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      />
    </div>
  );
};

export default CloseButton;
