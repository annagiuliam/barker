import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { NavLink, useRouteMatch } from "react-router-dom";
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
            <FaHome className="sidebar-icon" />
            <h3 className="sideb-option-name">Home</h3>
          </div>
        </NavLink>

        <NavLink to={`${url}barkers`} activeClassName={"active"}>
          <div className="sidebar-option">
            <BsPeopleFill className="sidebar-icon" />
            <h3 className="sideb-option-name">Who to follow</h3>
          </div>
        </NavLink>

        <NavLink
          to={`${url}profile/${currentUser.uid}`}
          activeClassName={"active"}
        >
          <div className="sidebar-option">
            <BsPersonFill className="sidebar-icon" />
            <h3 className="sideb-option-name">Your Profile</h3>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
