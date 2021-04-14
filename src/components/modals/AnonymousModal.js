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
        <div className="sign-in-form-container">
          <form className="sign-in-form" onSubmit={signInAnonymous}>
            <input
              type="text"
              placeholder="choose a username"
              onChange={updateAnonName}
            ></input>
            <button type="submit" className="sign-in-btn">
              Sign In Anonymously
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AnonymousModal;
