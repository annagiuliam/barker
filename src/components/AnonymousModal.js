import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const AnonymousModal = () => {
  const { signInAnonymous, updateAnonName, signInModal } = useContext(
    BarkerContext
  );
  const modalDisplay = signInModal
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={modalDisplay}>
      <section className="modal-main">
        <form onSubmit={signInAnonymous}>
          <input
            type="text"
            placeholder="choose a username"
            onChange={updateAnonName}
          ></input>
          <button type="submit">Sign In Anonymously</button>
        </form>
      </section>
    </div>
  );
};

export default AnonymousModal;
