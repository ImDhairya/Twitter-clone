import React from "react";
import Avatar from "react-avatar";
import {CiSearch} from "react-icons/ci";
import {Link} from "react-router-dom";
function RightSidebar({otherUsers}) {
  return (
    <div className=" w-[25%]">
      <div className=" flex text-gray-500">
        <div className=" flex items-center cursor-pointer">
          <CiSearch
            size={22}
            className=" cursor-pointer"
          />

          <input
            type="text"
            className=" p-2 outline-none border-gray-500 cursor-pointerhover:bg-slate-200 rounded-full"
            placeholder=" Search"
          />
        </div>
      </div>
      <div className=" p-4 mt-4">
        <h1 className=" font-bold text-lg"> Who to follow</h1>
        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className=" flex items-center mt-4 justify-between"
            >
              <div className=" flex items-center ">
                <div>
                  <Avatar
                    src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
                    size="49"
                    round={true}
                  />
                </div>
                <div className=" ml-2">
                  <h1 className=" font-bold"> {user.name}</h1>
                  <p className="text-sm">{`@ ${user.username}`}</p>
                </div>
              </div>
              <div className=" justify-between ">
                <Link to={`/profile/${user?._id}`}>
                  <button className=" px-4 ml-5 py-1 bg-black text-white  rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
        <div className=" flex items-center mt-4 justify-between">
          <div className=" flex items-center ">
            <div>
              <Avatar
                src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
                size="49"
                round={true}
              />
            </div>
            <div className=" ml-2">
              <h1 className=" font-bold"> Dhairya</h1>
              <p className="text-sm">@dhairyaPandya</p>
            </div>
          </div>
          <div>
            <button className=" px-4 ml-5 py-1 bg-black text-white  rounded-full">
              Profile
            </button>
          </div>
        </div>
      </div>
      {/* <div className=" ">
          <div className=" mt-4">
            <p className=" font-bold">Who to follow</p>
          </div>
        <div className="">
          <div className=" flex items-center justify-between ">
            <div className=" ">
              <Avatar
                className=" mt-2"
                src="https://yt3.ggpht.com/ytc/AIdro_mHPvsSlBK_zPLdjgWlG3_m5FpPSaJqv4xrxWwpWw=s88-c-k-c0x00ffffff-no-rj-mo"
                size="49"
                round={true}
              />
            </div>
            <div className=" ml-2">
              <h1 className=" font-bold text-sm">Dhairya</h1>
              <p className=" text-gray-400 text-sm">@dhairyaPandya</p>
            </div>
            <div className="">
              <button>Follow</button>
            </div>
          </div>

         
        </div>
      </div> */}
    </div>
  );
}

export default RightSidebar;
