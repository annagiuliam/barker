import React from "react";
import Post from "../post/Post";

const ProfileBarks = (props) => {
  const { posts, userInfo } = props;
  const userBarks = posts.filter((post) => post.uid === userInfo.uid);
  console.log(userBarks);
  return (
    <div className="posts-container">
      {userBarks.map((bark) => (
        <Post post={bark} key={bark.id} />
      ))}
    </div>
  );
};

export default ProfileBarks;
