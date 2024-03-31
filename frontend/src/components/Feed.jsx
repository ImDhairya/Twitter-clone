import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import {store} from "../redux/store";
import {useSelector} from "react-redux";
function Feed() {
  const {tweets} = useSelector((store) => store.tweet);

  return (
    <div className=" w-[60%] p-1 ">
      <div>
        <CreatePost />
  

        {tweets &&
          tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet?._id}
                tweet={tweet}
              />
            );
          })}

      </div>
    </div>
  );
}

export default Feed;
