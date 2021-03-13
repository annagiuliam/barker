import React from "react";
import Post from "../post/Post";
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const ProfileBarks = (props) => {
  //const { posts, userInfo } = props;
  // const userBarks = posts.filter((post) => post.uid === userInfo.uid);
  //console.log(useRouteMatch());

  return (
    <div className="posts-container">
      BARKS
      {/* {userBarks.map((bark) => (
        <Post post={bark} key={bark.id} />
      ))} */}
    </div>
  );
};

export default ProfileBarks;
