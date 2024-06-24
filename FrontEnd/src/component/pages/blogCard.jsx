import React from "react";
import { Link } from "react-router-dom";
function BlogCard(props) {
  const { blog } = props;
  // console.log(blog);
  return (
    <>
      <div className="flex flex-row h-full justify-between hover:bg-gray-100 rounded md:p-4 duration-200">
        {/* yaha pr likhit part hai */}
        <div className="flex flex-col w-full">
          {/* yaha pr title aur author hai */}
          <div className="">
            <Link to={`/u/otherUser/${blog.creator}`}>
              <p className=" font-thin hover:underline">
                By- {blog.creatorName}
              </p>
            </Link>
            <h1 className="text-[5vw]  font-serif">{blog.title}</h1>
            <p className="text-[3vw] md:text-[1.5vw]">{blog.createdAt}</p>
          </div>
          {/* yaha content aur likes wali jagah */}
          <div className="h-full flex flex-col justify-between">
            <p>{blog.article}...</p>
            <div className="flex w-full justify-around text-2xl font-extralight">
              <p>
                <i class="fa-regular fa-heart p-2"></i>
                {blog.totalLikes}
              </p>
              <p className="">
                <i class="fa-regular fa-comment p-2"></i>
                {blog.totalComments}
              </p>
            </div>
          </div>
        </div>
        {/* yaha photu part */}
        <div className="flex items-center">
          <div className="h-[8em] overflow-hidden w-[8em] md:w-[12em] md:h-[12em] rounded border-[2px] border-slate-500">
            <img
              src={blog.coverImage}
              alt=""
              className="h-[8em] w-[8em] md:w-[12em] md:h-[12em] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
