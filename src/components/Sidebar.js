import React, { useContext, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { Link, useParams, useRouteMatch } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = (props) => {
  const { userInfo } = useContext(BarkerContext);
  const { url, path } = useRouteMatch();

  return (
    <div className="sidebar">
      <GiBalloonDog id="dog-icon" />
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>

        <li>Other barkers</li>
        <Link to={`${url}profile/${userInfo.uid}`}>
          <li>Your profile</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
