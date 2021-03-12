import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { BarkerContext } from "./context/BarkerContext";
import "./styles/App.css";
import "./styles/Posts.css";
import "./styles/SignIn.css";
import "./styles/Sidebar.css";
import "./styles/Home.css";
import db from "./firebase/firebase";
//import { signIn } from "./firebase/firebaseHelpers";

import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

function App() {
  const { userLoggedIn } = useContext(BarkerContext);
  return (
    <BrowserRouter>
      <Route exact path="/login">
        {userLoggedIn ? <Redirect to="/home" /> : <LoginPage />}
      </Route>
      <Route path="/">
        {!userLoggedIn ? <Redirect to="/login" /> : <Home />}{" "}
      </Route>
      {/* <Route path="/home" component={Home} /> */}
    </BrowserRouter>
  );
  // userLoggedIn ? <Home /> : <LoginPage />);
}

export default App;
