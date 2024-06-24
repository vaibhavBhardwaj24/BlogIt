import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../../store/blogs";
import { toggleLike, isLiked } from "../../store/liked.js";
import { isSaved, toggleSave } from "../../store/saved.js";
import { Link } from "react-router-dom";
// import "./getById.css";
import axios from "axios";
import Comments from "./comment.jsx";
import LoggedInNavbar from "../pages/loggedInNavbar.jsx";
import Navbar from "../pages/navbar.jsx";
function GetById() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [logged, setLogged] = useState(false);
  const [loda, setLoda] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const findBlog = useSelector((state) => state.allBlogs.findBlog);
  const isLoading = useSelector((state) => state.allBlogs.isLoading);
  const isLike = useSelector((state) => state.liked.isLiked);
  const isSave = useSelector((state) => state.saved.isSaved);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accToken");
  useEffect(() => {
    if (token !== null && token !== undefined) {
      setLogged(true);
      setLoda(true);
    } else {
      setLogged(false);
      setLoda(false);
    }

    console.log(token);
  }, [token]);
  useEffect(() => {
    if (logged) {
      dispatch(isLiked({ blogId: blogId }));
      setLike(isLike.message);
      console.log(like);
    }
  }, [isLike.message]);
  useEffect(() => {
    if (logged) {
      dispatch(isSaved({ blogId: blogId }));
      setSave(isSave.message);
    }
  }, [isSave.message]);
  useEffect(() => {
    dispatch(getBlogById({ blogId }));

    // setPubAt()
  }, [blogId]);
  useEffect(() => {
    setLoading(isLoading);
    if (!isLoading) {
      setTotalLikes(findBlog.blogs[0].totalLikes);
      const time = findBlog.blogs[0].article.split(" ").length - 1;

      const round = Math.floor(time / 150);
      setReadTime(round);
    }
  }, [isLoading]);

  return (
    <>
      {logged ? <LoggedInNavbar /> : <Navbar />}

      {Loading ? (
        <h1>Loading.....</h1>
      ) : (
        <>
          <div className="w-full flex flex-col justify-start items-center">
            <img
              src={findBlog.blogs[0].coverImage}
              className="w-full h-[110vw] md:h-[30vw] object-top object-cover"
              alt=""
            />
            <div className="-translate-y-[13em] md:-translate-y-[15em] w-full h-full items-center flex flex-col">
              <div className=" py-4 px-14 border-gray-500 bg-slate-50 flex flex-col items-center rounded-md w-fit">
                <div className="md:text-7xl text-4xl  font-serif">
                  {findBlog.blogs[0].title}
                </div>
                <Link to={`/u/otherUser/${findBlog.blogs[0].creator}`}>
                  <p className=" font-thin text-xl hover:underline">
                    By- {findBlog.blogs[0].creatorName}
                  </p>
                </Link>
                <div className="border-[1px] border-slate-300 m-1 w-full"></div>
                <div className="flex flex-row w-full justify-around">
                  <div
                    className=" flex flex-col justify-center items-center"
                    onClick={() => {
                      if (loda) {
                        dispatch(
                          toggleLike({ blogId, title: findBlog.blogs[0].title })
                        );
                        console.log("loggedin");
                        if (like) {
                          setTotalLikes(totalLikes - 1);
                        } else {
                          setTotalLikes(totalLikes + 1);
                        }
                      } else {
                        navigate("/u/login");
                      }
                    }}
                  >
                    <i
                      className={`${
                        like
                          ? "fa-solid fa-heart text-red-400 text-3xl"
                          : "fa-regular fa-heart text-gray-900 text-3xl"
                      }`}
                    />
                    <p>{totalLikes}</p>
                  </div>
                  <div
                    onClick={() => {
                      if (loda) {
                        dispatch(
                          toggleSave({ blogId, title: findBlog.blogs[0].title })
                        );
                      } else {
                        navigate("/u/login");
                      }
                    }}
                  >
                    <i
                      class={`${
                        save
                          ? "fa-solid fa-bookmark text-gray-900 text-3xl"
                          : "fa-regular fa-bookmark text-3xl text-gray-900"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-row md:w-4/6 w-11/12 justify-around font-thin border-b-[1px] border-gray-300">
                {console.log(readTime)}
                <p>{readTime} Min Read</p>
                <p>{findBlog.blogs[0].createdAt}</p>
              </div>
              <div className=" mt-1  md:w-4/6 w-11/12 text-2xl font-serif">
                {findBlog.blogs[0].article}
              </div>
              <div className="border-[1px] border-gray-300 m-1 md:w-4/6 w-11/12 mt-4"></div>
              <div className="flex flex-col md:w-4/6 w-11/12 ">
                <h1 className="font-bold text-4xl font-serif">Comments:</h1>
                <Comments blogId={blogId} />
                {findBlog.blogs[0].allComments.map((com) => (
                  <>
                    <div
                      key={com._id}
                      className="bg-gray-300 flex flex-col items-start rounded-lg p-4 m-2"
                    >
                      <div className="flex justify-between w-full">
                        <Link to={`/u/otherUser/${com.user}`}>
                          <p className="flex text-xl font-thin hover:underline">
                            {com.userURL ? (
                              <img
                                src={com.userURL}
                                alt=""
                                className="mr-2 h-8 object-cover w-8 rounded-full border-[1px] border-black"
                              />
                            ) : (
                              <i class="mr-2 fa-solid fa-user rounded-full border-[1px] w-8 h-8 border-black flex items-center justify-center bg-gray-200"></i>
                            )}
                            {com.username}
                          </p>
                        </Link>

                        <p className="text-xs">{com.createdAt}</p>
                      </div>
                      <div className="border-[1px] border-gray-900 m-1 w-full"></div>
                      <p className="p-0">{com.comment} </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default GetById;
