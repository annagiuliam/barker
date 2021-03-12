import React, { useContext, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Profile from "./profile/Profile";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <Switch>
          <Route path={`/home`} exact component={Main} />
          <Route path={`/home/profile`} component={Profile} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
