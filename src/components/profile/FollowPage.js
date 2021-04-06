import React from "react";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import Following from "./Following";
import Followers from "./Following";

const FollowPage = (props) => {
  const { history, users } = props;
  const { uid } = useParams();
  const { url, path } = useRouteMatch();
  const user = users.find((ele) => ele.uid === uid);

  console.log(url);
  return (
    <div>
      <div className="arrow-left-container">
        <FiArrowLeft id="arrow-left" onClick={() => history.goBack()} />
      </div>
      <h2>{user.username}</h2>
      <div className="profile-tabs-container">
        <ul className="profile-tabs">
          <Link to={`${url}`}>
            <li>Following</li>
          </Link>
          <Link to={`/profile/${uid}/followers`}>
            <li>Followers</li>
          </Link>
        </ul>
      </div>
      <Switch>
        <Route
          path={`${url}`}
          render={(props) => <Following {...props} users={users} />}
        />

        <Route exact path={`/profile/:uid/followers`} component={Followers} />
      </Switch>
    </div>
  );
};

export default FollowPage;
