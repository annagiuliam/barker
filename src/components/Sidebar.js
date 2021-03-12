import React, { useContext, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";

import { Link } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = (props) => {
  const { userInfo } = useContext(BarkerContext);

  return (
    <div className="sidebar">
      <GiBalloonDog id="dog-icon" />
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>

        <li>Other barkers</li>
        <Link
          to={{
            pathname: "/home/profile",
            state: { uid: userInfo.uid },
          }}
        >
          <li>Your profile</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
