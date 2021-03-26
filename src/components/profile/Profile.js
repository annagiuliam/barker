import React, { useContext, useState, useEffect } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import {
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
  const { posts, users } = useContext(BarkerContext);
  const [bioText, setBioText] = useState("");
  //const [comments, setComments] = useState("");
  const { uid } = useParams();
  const { url, path } = useRouteMatch();

  const user = users.find((ele) => ele.uid === uid);

  return (
    <div className="center-container">
      {/* user profile data */}
      <div className="info-container">
        <div className="profile-pic-div">
          <img alt="pic" src={user.url} className="profile-pic"></img>
        </div>
        <h2 className="bio-username">{user.username}</h2>
        {/* bio, insert form later */}
        <div className="bio-container">THIS IS THE BIO</div>
        {/* tabs */}
        <div className="profile-tabs-container">
          <ul className="profile-tabs">
            <Link to={`${url}`}>
              <li>Barks</li>
            </Link>
            <Link to={`${url}/comments`}>
              <li>Comments</li>
            </Link>
            <Link to={`${url}/likes`}>
              <li>Likes</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* user content */}
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={(props) => <ProfileBarks {...props} posts={posts} />}
        />

        <Route
          path={`${path}/comments`}
          render={(props) => (
            <ProfileComments
              {...props}
              // comments={comments}
              // posts={posts}
              uid={uid}
              // database={database}
            />
          )}
        />
        <Route
          path={`${path}/likes`}
          render={(props) => <ProfileLikes {...props} posts={posts} />}
        />
      </Switch>
    </div>
  );
};

export default Profile;
