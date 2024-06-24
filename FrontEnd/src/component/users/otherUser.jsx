import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { otherUser } from "../../store/users";
import { toggleFollow, isFollowing } from "../../store/follower";
import LoggedInNavbar from "../pages/loggedInNavbar";
import Navbar from "../pages/navbar";
import FollowingList from "../pages/followingList";
import ProfilePost from "../pages/profilePost";

function OtherUser() {
  const dispatch = useDispatch();
  const OUser = useSelector((state) => state.user.otherUser);
  const { userId } = useParams();
  const [load, setLoad] = useState(true);
  const isLoading2 = useSelector((state) => state.user.isLoading2);
  const isLoading = useSelector((state) => state.follow.isLoading);
  const isFollow = useSelector((state) => state.follow.isfollow);
  const [follow, setFollow] = useState(false);

  const [logged, setLogged] = useState(false);
  const [followingList, setFollowingList] = useState(false);
  const [followerList, setFollowerList] = useState(false);
  const fowingList = (data) => {
    setFollowingList(data);
  };
  const fowerList = (data) => {
    setFollowerList(data);
  };
  useEffect(() => {
    setLoad(isLoading2);
  }, [isLoading2]);
  useEffect(() => {
    // console.log(isFollow);
    dispatch(
      isFollowing({
        otherUserId: userId,
      })
    );
  }, [isFollow]);
  useEffect(() => {
    dispatch(otherUser({ userId: userId }));
    console.log(OUser);
    const token = localStorage.getItem("accToken");
    if (token !== null && token !== undefined) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);
  return (
    <>
      {logged ? (
        <>
          <LoggedInNavbar />
        </>
      ) : (
        <>
          <Navbar />
        </>
      )}

      {load ? (
        <>loading.............</>
      ) : (
        <>
          {/* {OUser.profile[0]} */}
          <div className="w-full h-full flex justify-start items-center flex-col  ">
            <div className="md:w-4/6 w-11/12 border-0 border-black h-full flex md:flex-row md:justify-center flex-col-reverse justify-end">
              <div className="md:w-2/3 w-11/12 flex flex-col">
                <h1 className="text-5xl">
                  {OUser.profile[0].username}'s Posts
                </h1>
                <>
                  {OUser.profile[0].posts.map((post) => (
                    <div className="p-2">
                      <ProfilePost post={post} isPub={true} />
                    </div>
                  ))}
                </>
              </div>

              <div className="border-[1px] border-gray-300 "></div>
              <div className="md:w-1/3 p-4">
                <div className="flex justify-start items-center mx-4">
                  {OUser.profile[0].avatar ? (
                    <img
                      src={OUser.profile[0].avatar}
                      alt=""
                      className="mr-2 h-20 object-cover w-20 rounded-full border-[1px] border-black"
                    />
                  ) : (
                    <i class="mr-2 fa-solid fa-user rounded-full border-[1px] w-20 h-20 text-5xl border-black flex items-center justify-center bg-gray-200"></i>
                  )}
                  {/* {console.log(loggedUser.profile[0])} */}
                  <div className="flex flex-col">
                    <h1 className="text-3xl">{OUser.profile[0].username}</h1>
                    <h2 className="text-xs font-thin">
                      {OUser.profile[0].email}
                    </h2>
                  </div>
                </div>
                <div className="w-full flex my-6 mx-4 justify-start flex-col">
                  <div>
                    <button
                      className=" bg-gray-300 hover:bg-gray-400 duration-200 rounded-md w-1/2 text-xl md:w-4/5 my-2"
                      onClick={() => {
                        dispatch(
                          toggleFollow({
                            otherUserId: OUser.profile[0]._id,
                            otherUserName: OUser.profile[0].username,
                          })
                        );

                        console.log(isFollow);
                      }}
                    >
                      {isFollow ? (
                        <>
                          <h1>Unfollow</h1>
                        </>
                      ) : (
                        <>
                          <h1>Follow</h1>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <button
                      className="size-20 text-2xl mx- hover:bg-gray-400 duration-200 rounded-lg bg-gray-300"
                      onClick={() => {
                        setFollowingList(!followingList);
                      }}
                    >
                      {OUser.profile[0].following.length}
                      <p className="text-xs font-thin">Following</p>
                      {followingList && (
                        <FollowingList
                          fowerList={fowingList}
                          list={OUser.profile[0].following}
                        />
                      )}
                    </button>

                    <button
                      className="size-20 rounded-lg text-2xl mx-4 hover:bg-gray-400 duration-200 bg-gray-300"
                      onClick={() => {
                        setFollowerList(!followerList);
                      }}
                    >
                      {OUser.profile[0].followers.length}
                      {followerList && (
                        <FollowingList
                          fowerList={fowerList}
                          list={OUser.profile[0].followers}
                        />
                      )}
                      <p className="text-xs font-thin">Followers</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OtherUser;
