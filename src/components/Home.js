import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <BrowserRouter>
          <Switch>
            <Route path="/main" component={Main} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Home;
