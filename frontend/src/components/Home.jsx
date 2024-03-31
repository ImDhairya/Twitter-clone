import React, {useEffect} from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import {Outlet} from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import useOtherUsers from "../hooks/useOtherUsers";
import {useSelector} from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

function Home() {
  const {user, otherUsers} = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);
  return (
    <div>
      <div className="flex justify-between w-[80%] mt-5 mx-auto">
        <LeftSidebar />
        <Outlet />
        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
}

export default Home;
