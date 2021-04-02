import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { BarkerContext } from "./context/BarkerContext";

import "./styles/App.css";
import "./styles/Posts.css";
import "./styles/SignIn.css";
import "./styles/Sidebar.css";
import "./styles/Home.css";

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

      {/* <Route path="/home" component={Home} /> */}
      {showError && <ErrorModal />}
    </BrowserRouter>
  );
  // userLoggedIn ? <Home /> : <LoginPage />);
}

export default App;
