import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import PostMain from "./PostMain";

const RebarkModal = (props) => {
  const { post, updateRebark, submitRebark, rebarkText } = props;
  const { userInfo } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="rebark-container modal-main">
        <div className="user-info">
          <img alt="pic" src={userInfo.url} className="avatar-img"></img>
          <span className="username">{userInfo.username}</span>
        </div>
        <div className="post-input">
          <form onSubmit={submitRebark}>
            <input
              type="text"
              onChange={updateRebark}
              value={rebarkText}
            ></input>
            <PostMain post={post} />
            <button type="submit">Submit post</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RebarkModal;
