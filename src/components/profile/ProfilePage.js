import React from "react";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Profile from "./Profile";
import FollowPage from "./FollowPage";

const ProfilePage = (props) => {
  const { contents, posts, users } = props;
  const { path } = useRouteMatch();

  return (
    <div className="center-container">
      <Switch>
        <Route
          path={`${path}/following`}
          render={(props) => <FollowPage {...props} users={users} />}
        />
        <Route
          path={`${path}`}
          render={(props) => (
            <Profile
              {...props}
              contents={contents}
              posts={posts}
              users={users}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default ProfilePage;
