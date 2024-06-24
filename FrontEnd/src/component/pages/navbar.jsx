import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex w-full justify-between p-2 text-3xl">
      <h3>BlogIt</h3>
      <div>
        <Link to={"/u/login"} className="px-2">Login</Link>
        
        <Link to={"/u/register"} className="px-2">Sign Up</Link>
      </div>
    </div>
  );
}

export default Navbar;
