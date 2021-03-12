import React, { useContext, useState, useEffect } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { Link, Switch, Route } from "react-router-dom";

import ProfileBarks from "./ProfileBarks";
import ProfileLikes from "./ProfileLikes";
import ProfileComments from "./ProfileComments";

const Profile = (props) => {
  const { userInfo, posts } = useContext(BarkerContext);
  const [bioText, setBioText] = useState("");
  const { uid } = props.location.state;

  //useEffect(() => console.log(uid));
  return (
    <div className="center-container">
      {/* user profile data */}
      <div className="info-container">
        <div className="profile-pic-div">
          <img alt="pic" src={userInfo.url} className="profile-pic"></img>
        </div>
        <h2 className="bio-username">{userInfo.username}</h2>
        {/* bio, insert form later */}
        <div className="bio-container">THIS IS THE BIO</div>
        {/* tabs */}
        <div className="profile-tabs-container">
          <ul className="profile-tabs">
            <Link to="/home/profile">
              <li>Barks</li>
            </Link>
            <Link to="/home/profile/comments">
              <li>Comments</li>
            </Link>
            <Link to="/home/profile/likes">
              <li>Likes</li>
            </Link>
          </ul>
        </div>

        {/* user content */}
        <Switch>
          <Route
            exact
            path="/home/profile"
            render={(props) => (
              <ProfileBarks {...props} userInfo={userInfo} posts={posts} />
            )}
          />
          <Route path="/home/profile/comments" component={ProfileComments} />
          <Route path="/home/profile/likes" component={ProfileLikes} />
        </Switch>
      </div>
    </div>
  );
};

export default Profile;
