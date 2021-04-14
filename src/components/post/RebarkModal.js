import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";

import PostMain from "./PostMain";
import CloseButton from "../reusables/CloseButton";

const RebarkModal = (props) => {
  const { post, updateRebark, closeRebark, submitRebark, rebarkText } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="modal">
      <section className="modal-main">
        <CloseButton onClick={closeRebark} />
        <div className="post-edit-container">
          <div className="post-input">
            <div className="user-info">
              <img alt="pic" src={currentUser.url} className="avatar-img"></img>
              {/* <span className="username">{currentUser.username}</span> */}
            </div>
            <div className="rebark-form-container">
              <form onSubmit={submitRebark} className="rebark-form">
                <textarea
                  // className="post-input-form"
                  className="post-textarea"
                  placeholder="Insert your message"
                  onClick={(e) => e.stopPropagation()}
                  onChange={updateRebark}
                  value={rebarkText}
                ></textarea>
                <div>
                  <PostMain post={post} view="rebarked" />
                </div>

                <button type="submit" onClick={(e) => e.stopPropagation()}>
                  Submit post
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RebarkModal;
