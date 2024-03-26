import React from "react";
import Avatar from "react-avatar";
import {CiImageOn} from "react-icons/ci";
function CreatePost() {
  return (
    <div className=" w-[100%]">
      <div>
        <div className=" flex   items-center justify-items-end gap-1">
          <div className="  cursor-pointer text-center  hover:bg-gray-200 w-full px-4 py-3">
            <h1 className=" font-semibold text-gray-700 text-sm">For Your</h1>
          </div>
          <div className=" cursor-pointer text-center  hover:bg-gray-200 w-full  px-4 py-3">
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
              type="text"
              className=" w-full border-none ml-2 outline-none"
              placeholder=" What is happening?!"
            />
          </div>
          <div className=" flex items-center justify-between border-b border-gray-300 p-4">
            <div>
              <CiImageOn />
            </div>
            <button className=" bg-[#1D9Bf0] text-white hover:bg-blue-500 px-4 py-1 border-none rounded-full text-sm ">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
