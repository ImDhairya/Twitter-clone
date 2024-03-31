import axios from "axios";
import React, {useState} from "react";
import Avatar from "react-avatar";
import {CiImageOn} from "react-icons/ci";
import {TWEET_API_END_POINT} from "../utils/constant";
import Toast from "react-hot-toast";
import {store} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {getAllTweets, getIsActive, getRefresh} from "../redux/tweetSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const {user} = useSelector((store) => store.user);
  const {isActive} = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}create`,
        {description, id: user?._id},
        {withCredentials: true}
      );
      if (res.data.success) {
        Toast.success(res.data.message);
        dispatch(getRefresh());
      }
    } catch (error) {
      console.log(error);
      Toast.error(error.response.data.message);
    }
    setDescription("");
  };

  const forYouHandler = async () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = async () => {
    dispatch(getIsActive(false));
  };
  return (
    <div className=" w-[100%]">
      <div>
        <div className=" flex   items-center justify-items-end gap-1">
          <div
            onClick={forYouHandler}
            className={` ${
              isActive ? "border-b-4 border-blue-600" : null
            } cursor-pointer text-center  hover:bg-gray-200 w-full px-4 py-3`}
          >
            <h1 className=" font-semibold text-gray-700 text-sm">For Your</h1>
          </div>
          <div
            onClick={followingHandler}
            className={` ${
              isActive ? null : "border-b-4 border-blue-600"
            } cursor-pointer text-center  hover:bg-gray-200 w-full px-4 py-3`}
          >
            <h1 className=" font-semibold text-gray-700  text-sm">
              Following{" "}
            </h1>
          </div>
        </div>
        <div className=" ">
          <div className=" flex items-center p-4">
            <div>
              <Avatar
                src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
                size="49"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className=" w-full border-none ml-2 outline-none"
              placeholder=" What is happening?!"
            />
          </div>
          <div className=" flex items-center justify-between border-b border-gray-300 p-4">
            <div>
              <CiImageOn />
            </div>
            <button
              onClick={submitHandler}
              className=" bg-[#1D9Bf0] text-white hover:bg-blue-500 px-4 py-1 border-none rounded-full text-sm "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
