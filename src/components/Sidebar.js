import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { Router, Link, NavLink, useRouteMatch } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";

const Sidebar = (props) => {
  const { currentUser } = useContext(BarkerContext);
  const { url } = useRouteMatch();

  return (
    <div className="sidebar">
      <div>
        <GiBalloonDog id="dog-icon" />
      </div>
      <div className="menu-container">
        <NavLink activeClassName={"active"} exact={true} to="/home">
          <div className="sidebar-option">
            <FaHome />
            <h3>Home</h3>
          </div>
        </NavLink>

        <NavLink to={`${url}barkers`} activeClassName={"active"}>
          <div className="sidebar-option">
            <BsPeopleFill />
            <h3>Who to follow</h3>
          </div>
        </NavLink>

        <NavLink
          to={`${url}profile/${currentUser.uid}`}
          activeClassName={"active"}
        >
          <div className="sidebar-option">
            <BsPersonFill />
            <h3>Your Profile</h3>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
