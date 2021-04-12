import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import CloseButton from "../reusables/CloseButton";

const RebarkModal = (props) => {
  const { post, updateRebark, closeRebark, submitRebark, rebarkText } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="rebark-container modal-main">
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            closeRebark();
          }}
        />
        <div className="user-info">
          <img alt="pic" src={currentUser.url} className="avatar-img"></img>
          <span className="username">{currentUser.username}</span>
        </div>
        <div className="post-input">
          <form onSubmit={submitRebark}>
            <textarea
              className="rebark-textarea"
              onClick={(e) => e.stopPropagation()}
              onChange={updateRebark}
              value={rebarkText}
            ></textarea>
            <PostMain post={post} view="rebarked" />
            <button type="submit" onClick={(e) => e.stopPropagation()}>
              Submit post
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RebarkModal;
