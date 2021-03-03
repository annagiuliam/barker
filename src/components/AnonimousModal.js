import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const AnonimousModal = () => {
  const { signInAnonimous, updateUserName, signInModal } = useContext(
    BarkerContext
  );
  const modalDisplay = signInModal
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={modalDisplay}>
      <section className="modal-main">
        <form onSubmit={signInAnonimous}>
          <input
            type="text"
            placeholder="choose a username"
            onChange={updateUserName}
          ></input>
          <button type="submit">Sign In Anonimously</button>
        </form>
      </section>
    </div>
  );
};

export default AnonimousModal;
