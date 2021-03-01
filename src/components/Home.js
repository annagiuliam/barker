import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import Header from "./Header";
import PostInput from "./PostInput";
import Feed from "./Feed";
const Home = () => {
  return (
    <div>
      <Header />
      <PostInput />
      <div className="sidebar">Sidebar</div>
      <Feed />
    </div>
  );
};

export default Home;
