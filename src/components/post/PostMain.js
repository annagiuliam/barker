import React, { useContext } from "react";
import { BarkerContext } from "../../context/BarkerContext";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const PostMain = (props) => {
  const { post, view, deletePost, setShowEdit } = props;
  const { currentUser } = useContext(BarkerContext);

  const postClass = view ? `${view}-main` : "post-main";

  return (
    <div className={postClass} id={post.id}>
      <div className="main-top">
        <div className="user-info">
          <img alt="pic" src={post.url} className="avatar-img"></img>
          <Link to={`/profile/${post.uid}`} className="link-username">
            <span className="username">{post.username}</span>
          </Link>
        </div>

        {currentUser.uid === post.uid && (
          <div className="post-icon-div">
            <div>
              <BsTrash className="post-icon" onClick={deletePost} />
            </div>
            <div>
              <AiOutlineEdit
                className="post-icon"
                onClick={() => setShowEdit(true)}
              />
            </div>
          </div>
        )}
      </div>

      <Link to={`/post/${post.id}`} className="link-text-content">
        <div className="post-content">{post.text}</div>
      </Link>
      {/* do not show link if it is a comment
      {view === "comment" ? (
        <div className="post-content">{post.text}</div>
      ) : (
        <Link to={`/post/${post.id}`} className="link-text-content">
          <div className="post-content">{post.text}</div>
        </Link>
      )} */}
    </div>
  );
};

export default PostMain;
