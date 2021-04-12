import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { Router, Link, NavLink, useRouteMatch } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = (props) => {
  const { currentUser } = useContext(BarkerContext);
  const { url } = useRouteMatch();

  return (
    <div className="sidebar">
      <div>
        <GiBalloonDog id="dog-icon" />
      </div>
      <div>
        <ul className="sidebar-ul">
          {/* <NavLink to="/home" activeClassName="selected">
            <li>Home</li>
          </NavLink> */}

          <li>
            <NavLink activeClassName={"active"} exact={true} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}barkers`} activeClassName={"active"}>
              <GiBalloonDog />
              <span>Other barkers</span>
            </NavLink>
          </li>

          <Link to={`${url}profile/${currentUser.uid}`}>
            <li>Your profile</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
