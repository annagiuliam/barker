import React from "react";
import { useParams } from "react-router-dom";
import PostMain from "../post/PostMain";

const ProfileComments = (props) => {
  const { uid } = useParams();
  const { posts } = props;

  return <div className="posts-container">COMMENTI</div>;
};

export default ProfileComments;
