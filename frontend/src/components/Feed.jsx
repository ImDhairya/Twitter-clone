import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
function Feed() {
  return (
    <div className=" w-[60%] p-1 ">
      <div>
        <CreatePost />
        <Tweet />
      </div>
    </div>
  );
}

export default Feed