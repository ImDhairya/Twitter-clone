import React from "react";
import {CiHome} from "react-icons/ci";
import {CiHashtag} from "react-icons/ci";
import {IoIosNotificationsOutline} from "react-icons/io";
import {CiUser} from "react-icons/ci";
import {CiBookmark} from "react-icons/ci";
import {AiOutlineLogout} from "react-icons/ai";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {store} from "../redux/store";
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import {getMyProfile, getOtherUser, getUser} from "../redux/userSlice";

function LeftSidebar() {
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUser(null));
      dispatch(getMyProfile(null));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-[20%]">
      <div>
        <div>
          <img
            className=" w-[24px] ml-3"
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter logo"
          />
        </div>
        <div>
          <Link
            to={"/"}
            className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 "
          >
            <CiHome size={30} /> <p className=" ml-2 font-bold text-sm">Home</p>
          </Link>
          <div className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 ">
            <CiHashtag size={30} />{" "}
            <p className=" ml-2 font-bold text-sm">Explore </p>
          </div>
          <div className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 ">
            <IoIosNotificationsOutline size={30} />{" "}
            <p className=" ml-2 font-bold text-sm">Notifications</p>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 "
          >
            <CiUser size={30} />{" "}
            <p className=" ml-2 font-bold text-sm">Profile</p>
          </Link>
          <div className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 ">
            <CiBookmark size={30} />{" "}
            <p className=" ml-2 font-bold text-sm">Bookmarks</p>
          </div>
          <Link
            to={"/login"}
            onClick={logoutHandler}
            className=" flex cursor-pointer py-2 items-center mt-3 hover:bg-gray-200 rounded-full w-[200px] px-2 "
          >
            <AiOutlineLogout size={30} />{" "}
            <p className=" ml-2 font-bold text-sm">Logout</p>
          </Link>
          <button className=" mt-3 bg-[#1D9BF0] font-bold py-1 text-white border-none rounded-2xl text-sm px-4 text-[18px] w-full">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
