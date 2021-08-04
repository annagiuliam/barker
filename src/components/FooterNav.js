import React, { useContext } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { BarkerContext } from "../context/BarkerContext";

const FooterNav = () => {
  const { currentUser } = useContext(BarkerContext);
  const { url } = useRouteMatch();

  return (
    <div className="footer-nav">
      <NavLink activeClassName={"active"} exact={true} to="/home">
        <div className="nav-option">
          <FaHome className="nav-icon" />
        </div>
      </NavLink>

      <NavLink activeClassName={"active"} to={`${url}barkers`}>
        <div className="nav-option">
          <BsPeopleFill className="nav-icon" />
        </div>
      </NavLink>

      <NavLink to={`${url}profile/${currentUser.uid}`}>
        <div className="nav-option">
          <BsPersonFill className="nav-icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default FooterNav;
