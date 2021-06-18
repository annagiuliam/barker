import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton = (props) => {
  const containerClass = props.btnClass
    ? props.btnClass
    : "btn-container-right";
  return (
    <div className={containerClass}>
      <AiOutlineClose
        className="icon icon-close"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      />
    </div>
  );
};

export default CloseButton;
