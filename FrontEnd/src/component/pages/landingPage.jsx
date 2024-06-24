import React from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <Navbar></Navbar>
      <div className="text-xl justify-center h-full flex items-center flex-col">
        LandingPage
        <Link to={"/b/blogFeed"}>Explore</Link>
      </div>
    </body>
  );
}

export default LandingPage;
