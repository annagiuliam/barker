import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser, logOut } = useContext(BarkerContext);
  return (
    <header id="header">
      <div className="header-content">
        <div className="header-user">
          <div>
            <Link to={`/profile/${currentUser.uid}`}>
              <img
                className="avatar-img-small"
                src={currentUser.url}
                alt="user avatar"
              />
            </Link>
          </div>
          <div>
            <Link to={`/profile/${currentUser.uid}`} className="link-username">
              <span className="username">{currentUser.username}</span>
            </Link>
          </div>
        </div>

        <button className="log-out-btn" onClick={logOut}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
