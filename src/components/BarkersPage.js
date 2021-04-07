import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import UserTile from "../components/UserTile";

const BarkersPage = (props) => {
  const { users } = props;
  const { currentUser } = useContext(BarkerContext);
  const currUser = users.find((user) => user.uid === currentUser.uid);

  return (
    <div className="center-container">
      {users
        .filter((user) => user.uid !== currentUser.uid)
        .map((ele) => (
          <UserTile user={ele} currUser={currUser} key={ele.uid} />
        ))}
    </div>
  );
};

export default BarkersPage;
