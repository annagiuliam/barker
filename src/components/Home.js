import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Home;
