import React from "react";

import { FiArrowLeft } from "react-icons/fi";

const ArrowLeft = (props) => {
  return (
    <div className="arrow-left-container">
      <FiArrowLeft id="arrow-left" onClick={props.onClick} />
    </div>
  );
};

export default ArrowLeft;
