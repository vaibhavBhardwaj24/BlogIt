import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className=" p-2  flex justify-between  text-white fixed w-full z-40 backdrop-blur-sm border-b-[1px] border-white/[0.3]">
      <Link to={"/"}>
        <h3 className="text-3xl">BlogIt</h3>
      </Link>
      <div>
        <button className=" mx-4 my-1 relative inline-flex h-8 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 hover:bg-transparent duration-200 hover:text-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <Link className="text-xl" to={"/u/login"}>
              Login/Signup
            </Link>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
