import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Home = () => {
  //const { showRebark } = useContext(BarkerContext);
  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <Main />
        {/* {showRebark && <RebarkModal />} */}
      </div>
    </div>
  );
};

export default Home;
