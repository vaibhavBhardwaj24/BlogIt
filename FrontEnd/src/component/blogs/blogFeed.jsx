import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../store/blogs";
import { Link } from "react-router-dom";
import { getBlogById } from "../../store/blogs";
import { currentUser } from "../../store/users.js";
import { loginUser, logoutUser } from "../../store/users.js";
import FindUsers from "../users/findUsers.jsx";
import Navbar from "../pages/navbar.jsx";
import LoggedInNavbar from "../pages/loggedInNavbar.jsx";
import BlogCard from "../pages/blogCard.jsx";
function BlogFeed() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const allBloog = useSelector((state) => state.allBlogs.allBlogs);
  const isLoading = useSelector((state) => state.allBlogs.isLoading);
  const [logged, setLogged] = useState(false);
  const [lim, setLim] = useState(10);
  useEffect(() => {
    const token = localStorage.getItem("accToken");
    if (token !== null && token !== undefined) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    // console.log(allBloog);
  }, []);
  useEffect(() => {
    console.log(lim);
    dispatch(
      allBlogs({
        lim,
      })
    );
  }, [lim]);
  useEffect(() => {
    setLoad(isLoading);
  }, [isLoading]);
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
        <>
          <h1>lets see</h1>
        </>
      ) : (
        <>
          <div className="flex-col flex items-center w-full">
            <h1 className="text-7xl w-full flex justify-center md:p-5 sm:p-3">
              Latest blogs
            </h1>
            <div className="grid-cols-1 grid md:w-4/6 w-10/12 ">
              {allBloog.blogs.map((blg) => (
                <div key={blg._id} className="md:h-72 h-40">
                  <div
                    className="h-full w-full flex flex-col items-center"
                    onClick={() => {
                      const IID = blg._id;
                      dispatch(getBlogById({ blogId: IID }));
                    }}
                  >
                    <Link
                      to={`/b/getById/${blg._id}`}
                      className="h-full w-full"
                    >
                      <BlogCard blog={blg} />
                    </Link>
                    <div className="border-b-[1px] p-1 opacity-50 border-slate-600 w-3/4  "></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => {
          setLim(lim + 10);
        }}
      >
        load more
      </button>
      {/* <FindUsers /> */}
      {/* <img src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /> */}
    </>
  );
}
export default BlogFeed;
