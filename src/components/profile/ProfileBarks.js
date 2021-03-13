import React from "react";
import Post from "../post/Post";
import { useParams } from "react-router-dom";

const ProfileBarks = (props) => {
  const { uid } = useParams();
  const { posts } = props;
  const userPosts = posts.filter((post) => post.uid === uid);

  return (
    <div className="posts-container">
      {userPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default ProfileBarks;
