import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { currentUser } from "../../store/users.js";
import { loginUser, logoutUser } from "../../store/users.js";
function LoggedInNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const ava = localStorage.getItem("specificUser");
    setProfile(JSON.parse(ava));
    // console.log(ava);
  }, []);
  return (
    <div className="flex justify-between  text-white fixed w-full z-40 backdrop-blur-sm border-b-[1px] border-white/[0.3]">
      <div className="relative group px-4 py-1">
        <Link
          
          to={"/u/profile"}
          onClick={() => {
            dispatch(currentUser());
            // dispatch(currentUser());
            console.log("dispatched");
          }}
        >
          <div>
            {profile.avatar ? (
              <img
                src={profile.avatar}
                className="w-10 h-10 object-cover overflow-hidden rounded-full border-[1px] border-white/[0.7]"
              />
            ) : (
              <>
                {" "}
                <i class=" fa-solid fa-user rounded-full border-[1px] w-10 h-10 text-2xl text-black/[0.9] border-white flex items-center duration-200 justify-center bg-white/[0.7] hover:bg-white/[0.9]"></i>
              </>
            )}
          </div>
        </Link>
        <div class="absolute left-1 top-full w-40 p-2 cursor-pointer bg-black/[0.95] border-[1px] border-white/[0.5]  text-white rounded-xl hidden group-hover:flex justify-start flex-col ">
          <div className="flex">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                className="w-10 h-10 object-cover overflow-hidden rounded-full border-[1px] border-white/[0.7]"
              />
            ) : (
              <>
                {" "}
                <i class=" fa-solid fa-user rounded-full border-[1px] w-10 h-10 text-2xl text-black/[0.9] border-white flex items-center  justify-center bg-white/[0.7] hover:bg-white/[0.9]"></i>
              </>
            )}
            <div className="p-2">
              <Link
                to={"/u/profile"}
                onClick={() => {
                  dispatch(currentUser());
                  // dispatch(currentUser());
                  console.log("dispatched");
                }}
              >
                <h1 className="text-2xl hover:underline">{profile.username}</h1>
              </Link>
              <p className="text-sm">{profile.fullName}</p>
            </div>
          </div>
          <button
            className=" bg-white/[0.2] hover:bg-white/[0.4] rounded-md"
            onClick={async () => {
              const token = JSON.parse(localStorage.getItem("accToken"));
              localStorage.removeItem("accToken");
              localStorage.removeItem("specificUser");
              dispatch(
                logoutUser({
                  token: token,
                })
              );
              console.log(token);
              navigate("/b/blogFeed");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <button className=" mx-4 my-1 relative inline-flex h-8 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 hover:bg-transparent duration-200 hover:text-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <Link
            className="text-2xl"
            to={"/b/createBlog"}
          >
            Create
          </Link>
        </span>
      </button>
    </div>
  );
}

export default LoggedInNavbar;
