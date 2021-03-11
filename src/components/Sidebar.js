import React from "react";
import { Link } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <GiBalloonDog id="dog-icon" />
      <ul>
        {/* ADD LINKS */}
        <li>Home</li>
        <li>Other barkers</li>

        <li>Your profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;
