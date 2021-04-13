import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import {
  NavLink,
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import ProfileBarks from "./ProfileBarks";
import ProfileLikes from "./ProfileLikes";
import ProfileComments from "./ProfileComments";

const Profile = (props) => {
  const { contents, users, posts } = props;
  const { currentUser, follow, unfollow } = useContext(BarkerContext);
  //const [bioText, setBioText] = useState("");

  const { uid } = useParams();
  const { url, path } = useRouteMatch();
  const user = users.find((ele) => ele.uid === uid);

  //check if current user follows the user
  const following = users
    .find((user) => user.uid === currentUser.uid)
    .following.includes(user.uid);

  return (
    <div className="center-container">
      {/* user profile data */}
      <div className="info-container">
        <div className="profile-pic-div">
          <img alt="pic" src={user.url} className="profile-pic"></img>
        </div>
        <div className="info-center">
          <h2 className="bio-username">{user.username}</h2>

          {user.uid !== currentUser.uid && following && (
            <button onClick={() => unfollow(user)}>Unfollow</button>
          )}
          {user.uid !== currentUser.uid && !following && (
            <button onClick={() => follow(user)}>Follow</button>
          )}
        </div>

        <div className="follow-numbers">
          <Link to={`/${uid}/follow-page`}>
            <div>{user.following.length} following</div>
          </Link>
          <Link to={`/${uid}/follow-page/followers`}>
            <div className="followers">{user.followers.length} followers</div>
          </Link>
        </div>

        {/* tabs */}
        <div className="profile-tabs-container">
          {/* <ul className="profile-tabs"> */}
          {/* link needs to be active only if the path is exact */}
          {/* <NavLink to={`${url}`} exact={true} activeClassName={"active"}>
              <li>Barks</li>
            </NavLink>
            <NavLink to={`${url}/comments`} activeClassName={"active"}>
              <li>Comments</li>
            </NavLink>
            <NavLink to={`${url}/likes`} activeClassName={"active"}>
              <li>Likes</li>
            </NavLink>
          </ul> */}

          {/* link needs to be active only if the path is exact */}
          <NavLink to={`${url}`} exact={true} activeClassName={"active"}>
            <div>Barks</div>
          </NavLink>
          <NavLink to={`${url}/comments`} activeClassName={"active"}>
            <div>Comments</div>
          </NavLink>
          <NavLink to={`${url}/likes`} activeClassName={"active"}>
            <div>Likes</div>
          </NavLink>
        </div>
      </div>
      {/* user content */}
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={(props) => (
            <ProfileBarks {...props} contents={contents} posts={posts} />
          )}
        />

        <Route
          path={`${path}/comments`}
          render={(props) => (
            <ProfileComments {...props} contents={contents} uid={uid} />
          )}
        />
        <Route
          path={`${path}/likes`}
          render={(props) => <ProfileLikes {...props} contents={contents} />}
        />
      </Switch>
    </div>
  );
};

export default Profile;
