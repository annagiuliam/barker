import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

const AnonymousModal = () => {
  const { signInAnonymous, updateAnonName } = useContext(BarkerContext);

  return (
    <div className="modal">
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
