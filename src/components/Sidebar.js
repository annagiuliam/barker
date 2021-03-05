import React from "react";
import { GiBalloonDog } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <GiBalloonDog id="dog-icon" />
      <ul>
        <li>Home</li>
        <li>Other barkers</li>
        <li>Your profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;
