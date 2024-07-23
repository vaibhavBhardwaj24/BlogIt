import React from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WavyBackground } from "../ui/wavy-background";
function LandingPage() {
  useEffect(() => {
    const token = localStorage.getItem("accToken");
    if (token !== null && token !== undefined) {
      navi("/b/blogFeed");
    } else {
    }

    // console.log(allBloog);
  }, []);
  const navi = useNavigate();
  return (
    <body className="p-0 ">
      <Navbar />
      <WavyBackground className="max-w-4xl flex flex-col items-center justify-center mx-auto pb-40">
        <div className="text-9xl justify-center h-full font-bold   bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 flex items-center flex-col">
          BlogIt
        </div>
        <p className="text-xl justify-center h-full font-bold   bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 flex items-center flex-col">Write Freely, Connect Deeply, Inspire Many.</p>
        <Link to={"/b/blogFeed"}>
          <button className="text-6xl mx-4 my-1 relative inline-flex h-8 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 hover:bg-transparent duration-200 hover:text-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Explore
            </span>
          </button>
        </Link>
      </WavyBackground>
    </body>
  );
}

export default LandingPage;
