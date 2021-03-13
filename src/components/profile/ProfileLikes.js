import React from "react";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const ProfileLikes = () => {
  console.log(useParams());
  return <div>LIKES</div>;
};

export default ProfileLikes;
