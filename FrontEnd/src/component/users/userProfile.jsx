import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../store/users.js";
import { useParams } from "react-router-dom";
import LoggedInNavbar from "../pages/loggedInNavbar.jsx";
import FollowingList from "../pages/followingList.jsx";
import ProfilePost from "../pages/profilePost.jsx";
function UserProfile() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const isLoading2 = useSelector((state) => state.user.isLoading2);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const [postType, setPostType] = useState(0);
  const [followingList, setFollowingList] = useState(false);
  const [followerList, setFollowerList] = useState(false);
  const fowingList = (data) => {
    setFollowingList(data);
  };
  const fowerList = (data) => {
    setFollowerList(data);
  };
  useEffect(() => {
    // setLoad(isLoading2);
    console.log(load, "load");
    if (Object.keys(loggedUser).length == 0) {
      dispatch(currentUser());
    }
    // console.log(loggedUser.profile);
  }, [isLoading2]);
  useEffect(() => {
    if (Object.keys(loggedUser).length == 0) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [loggedUser]);
  return (
    <>
      {/* {console.log(loggedUser.profile[0])} */}
      <LoggedInNavbar />

      {load ? (
        <>
          {console.log(load)}
          Loading...........
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center flex-col  ">
          {/* <h1 className="text-6xl">User Profile</h1> */}
          <div className="md:w-4/6 w-11/12 border-0 border-black h-full flex md:flex-row md:justify-center flex-col-reverse justify-end">
            <div className="md:w-2/3 w-11/12 flex flex-col">
              <div className="flex w-full">
                <button
                  onClick={() => {
                    setPostType(0);
                  }}
                  className={`${
                    postType == 0
                      ? "flex-1 bg-red-200 border-b-4 border-red-600 duration-200"
                      : "flex-1"
                  }`}
                >
                  Your Posts <p>{loggedUser.profile[0].totalPosts}</p>
                </button>
                <button
                  onClick={() => {
                    setPostType(1);
                  }}
                  className={`${
                    postType == 1
                      ? "flex-1 bg-red-200 border-b-4 border-red-600 duration-200"
                      : "flex-1"
                  }`}
                >
                  Saved Posts <p>{loggedUser.profile[0].totalSaved}</p>
                </button>
                <button
                  onClick={() => {
                    setPostType(2);
                  }}
                  className={`${
                    postType == 2
                      ? "flex-1 bg-red-200 border-b-4 border-red-600 duration-200"
                      : "flex-1"
                  }`}
                >
                  Liked Posts <p>{loggedUser.profile[0].likedPosts.length}</p>
                </button>
              </div>
              <div>
                {postType == 0 && (
                  <>
                    {loggedUser.profile[0].posts.map((post) => (
                      <ProfilePost
                        className=""
                        post={post}
                        user={post._id}
                        isPub={post.isPublic}
                      />
                    ))}
                  </>
                )}
                {postType == 1 && (
                  <>
                    {loggedUser.profile[0].saved.map((post) => (
                      <ProfilePost post={post} isPub={true} />
                    ))}
                  </>
                )}
                {postType == 2 && (
                  <>
                    {loggedUser.profile[0].likedPosts.map((post) => (
                      <ProfilePost post={post} isPub={true} />
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="border-[1px] border-gray-300 "></div>
            <div className="md:w-1/3 p-4">
              <div className="flex justify-start items-center mx-4">
                {loggedUser.profile[0].avatar ? (
                  <img
                    src={loggedUser.profile[0].avatar}
                    alt=""
                    className="mr-2 h-20 object-cover w-20 rounded-full border-[1px] border-black"
                  />
                ) : (
                  <i class="mr-2 fa-solid fa-user rounded-full border-[1px] w-20 h-20 text-5xl border-black flex items-center justify-center bg-gray-200"></i>
                )}
                {/* {console.log(loggedUser.profile[0])} */}
                <div className="flex flex-col">
                  <h1 className="text-3xl">{loggedUser.profile[0].username}</h1>
                  <h2 className="text-xs font-thin">
                    {loggedUser.profile[0].email}
                  </h2>
                </div>
              </div>
              <div className="w-full flex my-6 mx-4 justify-start">
                <button
                  className="size-20 text-2xl mx- hover:bg-gray-400 duration-200 rounded-lg bg-gray-300"
                  onClick={() => {
                    setFollowingList(!followingList);
                  }}
                >
                  {loggedUser.profile[0].totalFollowing}
                  <p className="text-xs font-thin">Following</p>
                  {followingList && (
                    <FollowingList
                      fowerList={fowingList}
                      list={loggedUser.profile[0].following}
                    />
                  )}
                </button>

                <button
                  className="size-20 rounded-lg text-2xl mx-4 hover:bg-gray-400 duration-200 bg-gray-300"
                  onClick={() => {
                    setFollowerList(!followerList);
                  }}
                >
                  {loggedUser.profile[0].totalFollowers}
                  {followerList && (
                    <FollowingList
                      fowerList={fowerList}
                      list={loggedUser.profile[0].followers}
                    />
                  )}
                  <p className="text-xs font-thin">Followers</p>
                </button>
              </div>

              <div className="md:border-[1px] border-gray-300 border-0"></div>
              <div>{loggedUser.profile[0].description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UserProfile;
