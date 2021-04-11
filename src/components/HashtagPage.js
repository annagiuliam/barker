import React from "react";
import { useParams } from "react-router-dom";

import Post from "./post/Post";
import ArrowLeft from "./reusables/ArrowLeft";

const HashtagPage = (props) => {
  const { contents, history } = props;
  const { hashtag } = useParams();

  const hashtags = contents.filter((post) => post.text.includes(`#${hashtag}`));

  return (
    <div className="center-container">
      <ArrowLeft onClick={() => history.goBack()} />
      <div className="posts-container">
        {hashtags.map((post) => (
          <Post post={post} contents={contents} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default HashtagPage;
