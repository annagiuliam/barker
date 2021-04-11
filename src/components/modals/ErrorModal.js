import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import CloseButton from "../reusables/CloseButton";
const ErrorModal = () => {
  const { error, closeError } = useContext(BarkerContext);

  return (
    <div className="modal">
      <CloseButton onClick={closeError} />
      <section className="modal-main">
        <div className="error-message">{error}</div>
        <button onClick={closeError}>OK</button>
      </section>
    </div>
  );
};

export default ErrorModal;
