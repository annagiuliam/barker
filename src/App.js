import React, { useContext } from "react";
import { ReactRouter, Switch, Route } from "react-router-dom";
import { BarkerContext } from "./context/BarkerContext";
import "./styles/App.css";
import db from "./firebase/firebase";
//import { signIn } from "./firebase/firebaseHelpers";

import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

function App() {
  const { userLoggedIn } = useContext(BarkerContext);
  return userLoggedIn ? <Home /> : <LoginPage />;
}

export default App;
