import React from "react";

import { FaArrowLeft } from "react-icons/fa";

const ArrowLeft = (props) => {
  return (
    <div className="arrow-left-container">
      <FaArrowLeft id="arrow-left" onClick={props.onClick} />
    </div>
  );
};

export default ArrowLeft;
