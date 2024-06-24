import React from "react";

import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { currentUser } from "../../store/users.js";
import { loginUser, logoutUser } from "../../store/users.js";
function LoggedInNavbar() {
  const location = useLocation();
  const navigate=useNavigate()
  const dispatch = useDispatch();
  return (
    <div className="flex w-full justify-between p-2 text-3xl">
      <button
        className="px-2"
        onClick={async () => {
          const token = JSON.parse(localStorage.getItem("accToken"));
          localStorage.removeItem("accToken");
          dispatch(
            logoutUser({
              token: token,
            })
          );
          console.log(token);
          navigate("/b/blogFeed")
        }}
      >
        logout
      </button>
      <Link
        className={`${
          location.pathname === "/u/profile"
            ? "bg-red-400 text-white px-4 py-1 rounded-full"
            : "text-black"
        }`}
        to={"/u/profile"}
        onClick={() => {
          dispatch(currentUser())
          // dispatch(currentUser());
          console.log("dispatched");
        }}
      >
        Profile
      </Link>
      <Link
        className={`${
          location.pathname === "/b/createBlog"
            ? "bg-red-400 text-white px-4 py-1 rounded-full"
            : "text-black"
        }`}
        to={"/b/createBlog"}
      >
        create
      </Link>
    </div>
  );
}

export default LoggedInNavbar;
