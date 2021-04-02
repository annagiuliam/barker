import React, { useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import UserTile from "../components/UserTile";

const BarkersPage = (props) => {
  const { users } = props;
  const { userInfo } = useContext(BarkerContext);
  const currUser = users.find((user) => user.uid === userInfo.uid);

  // USER DISAPPEARS AFTER FOLLOWING, YOU SHOULD CHANGE BUTTON TO FOLLOWING
  return (
    <div className={"center-container"}>
      {users
        .filter(
          (user) =>
            !currUser.following.includes(user.uid) && user.uid !== currUser.uid
        )
        .map((ele) => (
          <UserTile user={ele} currUser={currUser} key={ele.uid} />
        ))}
    </div>
  );
};

export default BarkersPage;
