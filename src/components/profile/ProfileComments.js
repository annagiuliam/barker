import React from "react";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const ProfileComments = () => {
  console.log(useRouteMatch());
  return <div> COMMENTS</div>;
};

export default ProfileComments;
