import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import AnonimousModal from "./AnonimousModal";

const LoginPage = () => {
  const { userLoggedIn, signIn, showSignInModal, signInModal } = useContext(
    BarkerContext
  );

  return (
    <div id="login-page">
      <div id="login-btns">
        {!userLoggedIn && (
          <div>
            <button onClick={signIn}>Log in with Google</button>
            <button onClick={showSignInModal}>Log In Anonimously</button>
            {signInModal && <AnonimousModal />}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
