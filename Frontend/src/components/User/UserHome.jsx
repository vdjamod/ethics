import React from "react";

import UserHeader from "./UserHeader";
import HomeFriendCard from "./HomeCompo/HomeFriendCard";

function UserHome() {
  return (
    <>
      <UserHeader />
      <div className="user-home text-center flex">
        <div className="part-A w-1/5 h-screen  md:invisible">Part A</div>
        <div className="part-Main p-4 border border-gray-200 w-4/5 md:w-full align-center">
          <HomeFriendCard />
          <HomeFriendCard /> <HomeFriendCard /> <HomeFriendCard />{" "}
          <HomeFriendCard /> <HomeFriendCard /> <HomeFriendCard />{" "}
          <HomeFriendCard /> <HomeFriendCard /> <HomeFriendCard />{" "}
          <HomeFriendCard /> <HomeFriendCard /> <HomeFriendCard />{" "}
          <HomeFriendCard />
        </div>
        <div className="part-B w-1/5 h-screen  md:invisible">Part B</div>
      </div>
    </>
  );
}

export default UserHome;
