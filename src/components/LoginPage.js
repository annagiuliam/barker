import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

const LoginPage = () => {
  const { userLoggedIn, signIn } = useContext(BarkerContext);

  return (
    <div id="login-page">
      <div id="login-btns">
        {!userLoggedIn && <button onClick={signIn}>Log in with Google</button>}
      </div>
    </div>
  );
};

export default LoginPage;
