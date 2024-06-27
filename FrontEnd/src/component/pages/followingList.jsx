import React from "react";

import { Link } from "react-router-dom";
function FollowingList({ fowerList, list,ing }) {
  return (
    <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-black/[0.96] border-[1px] border-white/[0.3] p-4 w-1/2 md:w-1/6 rounded-lg ">
        {console.log("comaporok", list)}
        {ing?(<>Following</>):(<>Followers</>)}
        <div className="border-[1px] border-white/[0.4] "></div>
        {list.map((item) => (
          <>
            {console.log(item._id)}
            <div key={item._id}>
              <Link to={`/u/otherUser/${item.following || item.followers}`}>
                <p className=" font-thin hover:underline">
                  {item.followingName || item.followerName}
                </p>
              </Link>
            </div>
          </>
        ))}
        
      </div>
    </div>
  );
}

export default FollowingList;
