import React from "react";
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import Following from "./Following";
import Followers from "./Followers";

const FollowPage = (props) => {
  const { history, users } = props;
  const { uid } = useParams();
  const { url, path } = useRouteMatch();
  const user = users.find((ele) => ele.uid === uid);

  return (
    <div className="center-container">
      <div className="arrow-left-container">
        <FiArrowLeft id="arrow-left" onClick={() => history.goBack()} />
      </div>
      <h2>{user.username}</h2>

      <div className="profile-tabs-container">
        <NavLink to={`${url}`} exact={true} activeClassName={"active"}>
          <div>Following</div>
        </NavLink>
        <NavLink to={`${url}/followers`} activeClassName={"active"}>
          <div>Followers</div>
        </NavLink>
      </div>

      <Switch>
        <Route
          exact
          path={`${path}`}
          render={(props) => <Following {...props} users={users} />}
        />
        <Route
          path={`${path}/followers`}
          render={(props) => <Followers {...props} users={users} />}
        />
      </Switch>
    </div>
  );
};

export default FollowPage;
