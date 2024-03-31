import React from "react";
import Avatar from "react-avatar";
import {FaRegComment} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {CiBookmark} from "react-icons/ci";
import {MdOutlineDeleteOutline} from "react-icons/md";
import axios from "axios";
import {TWEET_API_END_POINT} from "../utils/constant";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {getRefresh} from "../redux/tweetSlice";

function Tweet({tweet}) {
  const user = useSelector((store) => store.user);
  // console.log(user.user._id);
  // console.log(tweet);

  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}like/${id}`,
        {id: user.user?._id},
        {withCredentials: true}
      );
      // console.log(res);
      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="  border-b border-gray-200">
      <div>
        <div className=" flex p-4">
          <Avatar
            src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
            size="49"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className=" flex  items-center">
              <h1 className=" font-bold text-sm">
                {tweet?.userDetails[0]?.name}
              </h1>
              <p className=" text-gray-400 ml-2 text-sm">{`@${tweet?.userDetails[0]?.username} .1m`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className=" flex justify-between w-full my-2">
              <div className=" flex  items-center ml-2">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className=" rounded-full hover:bg-red-200 "
                >
                  <CiHeart />
                </div>
                <p className=" ml-1">{tweet?.like?.length}</p>
              </div>
              <div className=" flex items-center ml-2">
                <div className=" rounded-full hover:bg-yellow-200">
                  <FaRegComment size={20} />
                </div>
                <p className=" ml-1">0</p>
              </div>
              <div className=" flex items-center ml-2">
                <div className=" rounded-full hover:bg-gray-200">
                  <CiBookmark />
                </div>
                <p className=" ml-1">0</p>
              </div>
              {user.user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className=" flex items-center ml-2"
                >
                  <div className=" rounded-full hover:bg-red-300">
                    <MdOutlineDeleteOutline />
                  </div>
                  <p className=" ml-1">0</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
