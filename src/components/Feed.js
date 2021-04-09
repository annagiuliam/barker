import React, { useContext, useState, useEffect } from "react";
import { BarkerContext } from "../context/BarkerContext";

import Post from "./post/Post";

const Feed = (props) => {
  const { contents, posts, users } = props;
  const { currentUser } = useContext(BarkerContext);
  const [filteredContent, setFilteredContent] = useState(null);
  const [updatedCurrUser, setUpdatedCurrUser] = useState(null);

  useEffect(() => {
    const updatedUser = users.find((user) => user.uid === currentUser.uid);
    setUpdatedCurrUser(updatedUser);
  }, [currentUser.uid, users]);

  useEffect(() => {
    if (updatedCurrUser) {
      const filtered = posts.filter(
        (ele) =>
          updatedCurrUser.following.includes(ele.uid) ||
          ele.uid === updatedCurrUser.uid
      );
      setFilteredContent(filtered);
    }
  }, [posts, updatedCurrUser]);

  return (
    <div className="posts-container">
      {filteredContent &&
        filteredContent.map((post) => (
          <Post post={post} contents={contents} key={post.id} />
        ))}
    </div>
  );
};

export default Feed;
