import React from "react";

import { Link } from "react-router-dom";
function FollowingList({ fowerList, list }) {
  return (
    <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-200 p-4 w-1/2 md:w-1/6 rounded-lg ">
        {console.log("comaporok", list)}
        Following
        <div className="border-[1px] border-gray-400 "></div>
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
        {/* <button
          onClick={() => {
            fowerList(false);
          }}
        >
          click
        </button> */}
      </div>
    </div>
  );
}

export default FollowingList;
