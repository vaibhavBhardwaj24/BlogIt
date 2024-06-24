import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { loginUser, logoutUser } from "../../store/users.js";
import { Link } from "react-router-dom";
import Navbar from "../pages/navbar.jsx";
function LoginUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const isLoading2 = useSelector((state) => state.user.isLoading2);
  const firstRender = useRef(true);
  useEffect(() => {
    if (loggedUser.redirectTo) {
      navigate(loggedUser.redirectTo);
    }
  }, [loggedUser]);
  useEffect(() => {
    console.log(loggedUser);
    if (loggedUser.redirectTo) {
      navigate(loggedUser.redirectTo);
    }
    if (Object.keys(loggedUser).length > 0) {
      localStorage.setItem("accToken", JSON.stringify(loggedUser.accToken));
    }
    if (
      loggedUser &&
      loggedUser.specificUser &&
      loggedUser.specificUser.username
    ) {
      setUser(loggedUser.specificUser.username);
    } else {
      setUser(null);
    }
  }, [loggedUser]);
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex justify-center items-start ">
        <form
          action=""
          className=" flex-col w-10/12 md:w-1/2 flex items-center"
        >
          <h1 className="text-6xl font-serif">Login</h1>
          <div className="border-[1px] w-full border-black my-2 focus:border-none"></div>
          <input
            className="text-2xl m-4 font-thin focus:outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="text-2xl m-4 font-thin focus:outline-none"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="text-2xl m-4  font-thin focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
          className="text-2xl hover:bg-red-500 rounded-md bg-red-400 text-white p-2"
            onClick={(e) => {
              e.preventDefault();
              
              dispatch(
                loginUser({
                  username: username,
                  email: email,
                  password: password,
                })
              );
            }}
          >
            Submit
          </button>
          <p>Already have a account? <Link to={"/u/register"} className="text-red-500 hover:underline">Sign up</Link></p>
        </form>
        
      </div>
    </>
  );
}
export default LoginUser;
