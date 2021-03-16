import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

const ErrorModal = () => {
  const { showError, error, closeError } = useContext(BarkerContext);
  const modalDisplay = showError ? "modal display-block" : "modal display-none";
  return (
    <div className={modalDisplay}>
      <section className="modal-main">
        <div className="error-message">{error}</div>
        <button onClick={closeError}>OK</button>
      </section>
    </div>
  );
};

export default ErrorModal;
