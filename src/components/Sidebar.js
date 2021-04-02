import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { Link, useRouteMatch } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = () => {
  const { userInfo } = useContext(BarkerContext);
  const { url } = useRouteMatch();

  return (
    <div className="sidebar">
      <GiBalloonDog id="dog-icon" />
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>

        <Link to={`${url}barkers`}>
          <li>Other barkers</li>
        </Link>

        <Link to={`${url}profile/${userInfo.uid}`}>
          <li>Your profile</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
