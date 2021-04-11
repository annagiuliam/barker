import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import CloseButton from "../reusables/CloseButton";

const AnonymousModal = () => {
  const { signInAnonymous, setSignInModal, updateAnonName } = useContext(
    BarkerContext
  );

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={() => setSignInModal(false)} />
        <form className="sign-in-form" onSubmit={signInAnonymous}>
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
