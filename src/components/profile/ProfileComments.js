import React from "react";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const ProfileComments = () => {
  const { uid } = useParams();
  console.log(uid);
  return <div> COMMENTS</div>;
};

export default ProfileComments;
