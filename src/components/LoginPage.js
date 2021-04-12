import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import AnonymousModal from "./modals/AnonymousModal";

const LoginPage = () => {
  const { signIn, showSignInModal, signInModal } = useContext(BarkerContext);

  return (
    <div id="login-page">
      <div className="welcome-box">
        <div>
          <h2>Welcome to Barker!</h2>
          <p>Sign In to access the Barker world!</p>
        </div>

        <div className="btns-container">
          <button onClick={signIn}>Log in with Google</button>
          <button onClick={showSignInModal}>Log In Anonimously</button>
        </div>
      </div>
      {signInModal && <AnonymousModal />}
    </div>
  );
};

export default LoginPage;
