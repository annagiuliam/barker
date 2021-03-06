import React from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";

const ProfileLikes = (props) => {
  const { uid } = useParams();
  const { contents } = props;

  const userLikedPosts = contents.filter((post) => post.likedBy.includes(uid));
  return (
    <div className="posts-container">
      {userLikedPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default ProfileLikes;
