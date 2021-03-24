import React, { useContext, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Profile from "./profile/Profile";
import PostPage from "../components/PostPage";

const Home = () => {
  const { url, path } = useRouteMatch();

  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <Switch>
          <Route path={`/home`} exact component={Main} />
          <Route path={`${path}profile/:uid`} component={Profile} />
          <Route path={`${path}post/:id`} component={PostPage} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
