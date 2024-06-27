import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../store/blogs";
import Navbar from "../pages/navbar.jsx";
import { TracingBeam } from "../ui/tracing-beam.tsx";
import LoggedInNavbar from "../pages/loggedInNavbar.jsx";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid.tsx";
import Loadings from "../pages/loading.jsx";
function BlogFeed() {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );
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
          <Loadings />
        </>
      ) : (
        <>
          <div className="pt-12">
            <TracingBeam className="px-1">
              <div className="flex-col flex items-center w-full z-10 ">
                <h1 className="text-7xl font-bold bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6">
                  Latest Blogs
                </h1>
                <div className="w-full">
                  <BentoGrid>
                    {allBloog.blogs.map((blg, i) => (
                      <BentoGridItem
                     
                        _id={blg._id}
                        key={blg._id}
                        title={blg.title}
                        description={blg.article}
                        creator={blg.creator}
                        creatorName={blg.creatorName}
                        likes={blg.totalLikes}
                        comments={blg.totalComments}
                        header={
                          blg.coverImage ? (
                            <img src={blg.coverImage} alt="" />
                          ) : (
                            <Skeleton />
                          )
                        }
                        className={i % 5 === 0 ? "md:col-span-2" : ""}
                        
                      />
                      // </Link>
                    ))}
                  </BentoGrid>
                </div>
              </div>
            </TracingBeam>
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
    </>
  );
}
export default BlogFeed;
