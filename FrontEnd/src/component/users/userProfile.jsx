import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../store/users.js";
import { getBlogById } from "../../store/blogs.js";
import { useParams } from "react-router-dom";
import LoggedInNavbar from "../pages/loggedInNavbar.jsx";
import FollowingList from "../pages/followingList.jsx";
import ProfilePost from "../pages/profilePost.jsx";
import { cn } from "../../utils/cn.ts";
import { Link } from "react-router-dom";
import Loadings from "../pages/loading.jsx";
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
  const BottomGradientPer = () => {
    return (
      <>
        <span className="opacity-100 block transition duration-500  absolute h-[3px] w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="opacity-100 blur-sm block transition duration-500  absolute h-[3px] w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
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
      {/* {console.log(loggedUser.profile[0])} */}
      <LoggedInNavbar />

      {load ? (
        <>
          {console.log(load)}
          <Loadings />
        </>
      ) : (
        <div className="w-full h-[100vh] bg-grid-small-white/[0.2] flex justify-start items-center flex-col  ">
          {/* <h1 className="text-6xl">User Profile</h1> */}
          <h1 className="text-7xl font-bold bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 pt-12">
            Profile
          </h1>
          <div className="md:w-4/6 w-11/12 border-0 border-black h-full flex md:flex-row md:justify-center flex-col-reverse justify-end ">
            <div className="md:w-2/3 w-11/12 flex flex-col">
              <div className="flex w-full">
                <button
                  onClick={() => {
                    setPostType(0);
                  }}
                  className={`${
                    postType == 0
                      ? "flex-1  relative group/btn duration-200"
                      : "flex-1 relative group/btn"
                  }`}
                >
                  Your Posts <p>{loggedUser.profile[0].totalPosts}</p>
                  {postType == 0 ? (
                    <BottomGradientPer />
                  ) : (
                    <>
                      <BottomGradient />
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setPostType(1);
                  }}
                  className={`${
                    postType == 1
                      ? "flex-1  relative group/btn duration-200"
                      : "flex-1 relative group/btn"
                  }`}
                >
                  Saved Posts <p>{loggedUser.profile[0].totalSaved}</p>
                  {postType == 1 ? (
                    <BottomGradientPer />
                  ) : (
                    <>
                      <BottomGradient />
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setPostType(2);
                  }}
                  className={`${
                    postType == 2
                      ? "flex-1  relative group/btn duration-200"
                      : "flex-1 relative group/btn"
                  }`}
                >
                  Liked Posts <p>{loggedUser.profile[0].likedPosts.length}</p>
                  {postType == 2 ? (
                    <BottomGradientPer />
                  ) : (
                    <>
                      <BottomGradient />
                    </>
                  )}
                </button>
              </div>
              <div>
                {postType == 0 && (
                  <>
                    <BentoGrid className="p-4">
                      {loggedUser.profile[0].posts.map((post, i) => (
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
                )}
                {postType == 1 && (
                  <>
                    <BentoGrid className="p-4">
                      {loggedUser.profile[0].saved.map((post, i) => (
                        <BentoItem
                          onClick={() => {
                            dispatch(getBlogById({ blogId: post._id }));
                          }}
                          _id={post._id}
                          key={post._id}
                          title={post.title}
                          header={
                            post.coverURL ? (
                              <img src={post.coverURL} alt="" />
                            ) : (
                              <Skeleton />
                            )
                          }
                          className={i % 5 === 0 ? "md:col-span-2" : ""}
                        />
                      ))}
                    </BentoGrid>
                  </>
                )}
                {postType == 2 && (
                  <>
                    <BentoGrid className="p-4">
                      {loggedUser.profile[0].likedPosts.map((post, i) => (
                        <BentoItem
                          onClick={() => {
                            dispatch(getBlogById({ blogId: post._id }));
                          }}
                          _id={post._id}
                          key={post._id}
                          title={post.title}
                          header={
                            post.coverURL ? (
                              <img src={post.coverURL} alt="" />
                            ) : (
                              <Skeleton />
                            )
                          }
                          className={i % 5 === 0 ? "md:col-span-2" : ""}
                        />
                      ))}
                    </BentoGrid>
                  </>
                )}
              </div>
            </div>
            <div className="border-[1px] border-white/25 "></div>
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
                  className="size-20 text-2xl mx- hover:bg-gray-300/35 border-[1px] border-white/30 duration-200 rounded-lg bg-gray-300/25"
                  onClick={() => {
                    setFollowingList(!followingList);
                  }}
                >
                  {loggedUser.profile[0].totalFollowing}
                  <p className="text-xs font-thin">Following</p>
                  {followingList && (
                    <FollowingList
                      ing={true}
                      fowerList={fowingList}
                      list={loggedUser.profile[0].following}
                    />
                  )}
                </button>

                <button
                  className="size-20 rounded-lg text-2xl mx-4 border-[1px] border-white/30 hover:bg-gray-300/35 duration-200 bg-gray-300/25"
                  onClick={() => {
                    setFollowerList(!followerList);
                  }}
                >
                  {loggedUser.profile[0].totalFollowers}
                  {followerList && (
                    <FollowingList
                      ing={false}
                      fowerList={fowerList}
                      list={loggedUser.profile[0].followers}
                    />
                  )}
                  <p className="text-xs font-thin">Followers</p>
                </button>
              </div>

              <div className="md:border-[1px] border-white/25 border-0 "></div>
              <div>{loggedUser.profile[0].description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UserProfile;
