import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { BarkerContext } from "./context/BarkerContext";

import "./styles/app.css";
import "./styles/posts.css";
import "./styles/signIn.css";
import "./styles/sidebar.css";
import "./styles/home.css";
import "./styles/profile.css";
import "./styles/buttons.css";

import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import ErrorModal from "../src/components/modals/ErrorModal";

function App() {
  const { userLoggedIn, showError } = useContext(BarkerContext);
  return (
    <BrowserRouter>
      <Route exact path="/login">
        {userLoggedIn ? <Redirect to="/home" /> : <LoginPage />}
      </Route>
      <Route path="/">
        {!userLoggedIn ? <Redirect to="/login" /> : <Home />}{" "}
      </Route>

      {showError && <ErrorModal />}
    </BrowserRouter>
  );
}

export default App;
