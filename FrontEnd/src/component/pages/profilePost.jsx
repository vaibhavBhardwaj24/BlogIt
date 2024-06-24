import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, togglePublicBlog } from "../../store/blogs";
import axios from "axios";
function ProfilePost(props) {
  const { post, user, isPub } = props;
  const dispatch = useDispatch();
  const [isPublic, setPublic] = useState();
  useEffect(() => {
    setPublic(isPub);
  }, [isPub]);
  const isLoading = useSelector((state) => state.allBlogs.isLoading);
  return (
    <>
      <div className=" flex justify-start  items-center">
        <Link
          to={`/b/getById/${post.blogId || user}`}
          className="h-full w-full hover:underline"
        >
          <div className="rounded-lg flex flex-col text-2xl  bg-gray-200 h-full m-2">
            <p
              className={`${
                !isPublic
                  ? "text-xs bg-gray-400 w-full h-1/4 rounded-t-lg p-1"
                  : "hidden"
              }`}
            >
              {isPublic ? <></> : <p>Private</p>}
            </p>
            <p className="p-2">{post.title}</p>
          </div>
        </Link>
        {user && (
          <>
            <button
              className="p-2 text-black hover:text-red-500 duration-200"
              onClick={() => {
                dispatch(deleteBlog({ blogId: user }));
              }}
            >
              <i className="fa-solid fa-trash  "></i>
            </button>
            <button
              className="bg-red-300 rounded-xl hover:bg-red-400 "
              onClick={() => {
                setPublic(!isPub);
                dispatch(togglePublicBlog({ blogId: user, isPub: isPublic }));
                console.log(isPub);
              }}
            >
              {!isPublic ? <>Make Public</> : <>Make Private</>}
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePost;
