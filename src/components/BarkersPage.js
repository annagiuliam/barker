import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import UserTile from "../components/UserTile";

const BarkersPage = (props) => {
  const { users } = props;
  const { currentUser } = useContext(BarkerContext);

  return (
    <div className="center-container">
      {users
        .filter((user) => user.uid !== currentUser.uid)
        .map((ele) => (
          <UserTile user={ele} users={users} key={ele.uid} />
        ))}
    </div>
  );
};

export default BarkersPage;
