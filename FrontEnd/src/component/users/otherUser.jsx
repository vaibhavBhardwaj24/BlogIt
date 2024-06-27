import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { otherUser } from "../../store/users";
import { toggleFollow, isFollowing } from "../../store/follower";
import LoggedInNavbar from "../pages/loggedInNavbar";
import Navbar from "../pages/navbar";
import FollowingList from "../pages/followingList";
import ProfilePost from "../pages/profilePost";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
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
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );
  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  const BentoGrid = ({ className, children }) => {
    return (
      <div
        className={cn(
          "grid md:auto-rows-[14rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
          className
        )}
      >
        {" "}
        {children}
      </div>
    );
  };
  const BentoItem = ({ className, title, header, _id }) => {
    return (
      <Link
        to={`/b/getById/${_id}`}
        className={cn(
          "row-span-1 h-auto rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
        {" "}
        <div className="overflow-hidden object-cover rounded-xl object-top">
          {header}
        </div>
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
        </div>
      </Link>
    );
  };
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
          <div className="w-full h-[100vh] bg-grid-small-white/[0.2] flex justify-start items-center flex-col ">
            <h1 className="text-7xl font-bold bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 pt-12">
              {OUser.profile[0].username}'s Profile
            </h1>
            <div className="md:w-4/6 w-11/12 border-0 border-black h-full flex md:flex-row md:justify-center flex-col-reverse justify-end">
              <div className="md:w-2/3 w-11/12 flex flex-col">
                <>
                  <BentoGrid className="p-4">
                    {OUser.profile[0].posts.map((post, i) => (
                      <BentoItem
                        onClick={() => {
                          dispatch(getBlogById({ blogId: post._id }));
                        }}
                        _id={post._id}
                        key={post._id}
                        title={post.title}
                        header={
                          post.coverURL || post.coverImage ? (
                            <img
                              src={post.coverURL || post.coverImage}
                              alt=""
                            />
                          ) : (
                            <Skeleton />
                          )
                        }
                        className={i % 5 === 0 ? "md:col-span-2" : ""}
                      />
                    ))}
                  </BentoGrid>
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
                      className=" hover:bg-gray-300/55 border-[1px] border-white/30 duration-200 rounded-lg bg-gray-300/25 w-1/2 text-xl md:w-4/5 my-2"
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
                  <div className="w-full flex my-6 mx-4 justify-start flex-col ">
                    <div className="">
                      <button

                        className="size-20 mx-2 text-2xl mx- hover:bg-gray-300/35 border-[1px] border-white/30 duration-200 rounded-lg bg-gray-300/25"
                        onClick={() => {
                          setFollowingList(!followingList);
                        }}
                      >
                        {OUser.profile[0].following.length}
                        <p className="text-xs font-thin">Following</p>
                        {followingList && (
                          <FollowingList
                            ing={true}
                            fowerList={fowingList}
                            list={OUser.profile[0].following}
                          />
                        )}
                      </button>

                      <button

                        className="size-20 mx-2 text-2xl mx- hover:bg-gray-300/35 border-[1px] border-white/30 duration-200 rounded-lg bg-gray-300/25"
                        onClick={() => {
                          setFollowerList(!followerList);
                        }}
                      >
                        {OUser.profile[0].followers.length}
                        {followerList && (
                          <FollowingList
                            ing={false}
                            fowerList={fowerList}
                            list={OUser.profile[0].followers}
                          />
                        )}
                        <p className="text-xs font-thin">Followers</p>
                      </button>
                    </div>

                    {/* <div className="md:border-[1px] border-white/25 border-0 "></div> */}
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
