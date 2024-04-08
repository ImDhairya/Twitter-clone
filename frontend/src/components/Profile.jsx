import React from "react";
import Avatar from "react-avatar";
import {IoMdArrowBack} from "react-icons/io";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../redux/store";
import toast from "react-hot-toast";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import {followingUpdate} from "../redux/userSlice";
import {getRefresh} from "../redux/tweetSlice";

function Profile() {
  const dispatch = useDispatch();
  const {user, profile} = useSelector((store) => store.user);
  console.log(" not params ", user?._id);
  const a = user?._id;
  const {id} = useParams();
  useGetProfile(id);
  const followAndUnFollowHandler = async () => {
    if (user.following.includes(id)) {
      //unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}unfollowing/${id}`, {
          id: user.user?._id,
        });
        console.log(res);

        toast.success(res.data.message);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      //follow
      try {
        axios.defaults.withCredentials = true;

        // axios.post(`${USER_API_END_POINT}login`)

        const res = await axios.post(`${USER_API_END_POINT}following/${id}`, {
          id: user.user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" w-[50%] border-l border-r pr-1 border-gray-200">
      <div className="">
        <div className=" flex items-center">
          <Link
            to={"/"}
            className=" items-center hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack />
          </Link>
          <div className=" ml-3">
            <h1 className=" font-bold ">{profile?.name}</h1>
            <p className=" text-[15px] text-gray-500">10 post</p>
          </div>
        </div>

        <div className=" ">
          <img
            src="https://media.licdn.com/dms/image/D4D16AQHAIHtlLPzVDQ/profile-displaybackgroundimage-shrink_350_1400/0/1707221466861?e=1717027200&v=beta&t=c3OSW8N7tZBGEhFW3Mhsv28p-b5sVp9I6RGKBkCdiL4"
            alt="dsf"
          />
          <div className=" absolute rounded-full ml-12 -mt-10 border-green-600 border-4">
            <Avatar
              src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
              size="120"
              round={true}
            />
          </div>
          <div className="  text-right">
            {profile?._id === user?._id ? (
              <button className="border-gray-700 border hover:bg-gray-200 mt-4 font-bold rounded-full px-3 py-1 text-sm ">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followAndUnFollowHandler}
                className="border-gray-700 border hover:bg-gray-200 mt-4 font-bold rounded-full px-3 py-1 text-sm "
              >
                {user.following.includes(id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className=" m-4">
            <h1 className=" font-bold text-xl">{profile?.name}</h1>
            <p>{`@${profile?.username}`}</p>
          </div>
          <div className=" text-sm px-5">
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              modi similique provident? Odit, natus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
