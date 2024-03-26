import React from "react";
import Avatar from "react-avatar";
import {IoMdArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";
function Profile() {
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
            <h1 className=" font-bold ">Dhairya Pandya</h1>
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
            <button className="border-gray-700 border hover:bg-gray-200 mt-4 font-bold rounded-full px-3 py-1 text-sm ">
              Edit Profile
            </button>
          </div>
          <div className=" m-4">
            <h1 className=" font-bold text-xl">Dhairya</h1>
            <p>@dhairyaPandya</p>
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
