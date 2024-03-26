import React from "react";
import Avatar from "react-avatar";
import {FaRegComment} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {CiBookmark} from "react-icons/ci";

function Tweet() {
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
              <h1 className=" font-bold text-sm">Dhairya</h1>
              <p className=" text-gray-400 ml-2 text-sm">@dhairyaPandya. 1m</p>
            </div>
            <div>
              <p>Hello developers lets connect and grow together</p>
            </div>
            <div className=" flex justify-between w-full my-2">
              <div className=" flex  items-center ml-2">
                <div className=" rounded-full hover:bg-red-200 ">
                  <CiHeart />
                </div>
                <p className=" ml-1">0</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
