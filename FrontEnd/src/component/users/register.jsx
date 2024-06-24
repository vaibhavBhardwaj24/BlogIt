import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/users.js";
import Navbar from "../pages/navbar.jsx";
function Registeruser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const loggedUser = useSelector((state) => state.user.loggedUser);
  useEffect(() => {
    if (loggedUser.redirectTo) {
      console.log(loggedUser.redirectTo);
      navigate(loggedUser.redirectTo);
    }
  }, [loggedUser]);
  useEffect(() => {
    console.log(loggedUser);
    if (loggedUser.redirectTo) {
      navigate(loggedUser.redirectTo);
    }
    localStorage.setItem("accToken", JSON.stringify(loggedUser.accToken));
  }, [loggedUser]);
  return (
    <>
    <Navbar/>
      <div className="w-full h-full flex justify-center items-start ">
        <form
          action=""
          className=" flex-col w-10/12 md:w-1/2 flex items-center"
        >
          <h1 className="text-6xl font-serif">Sign Up</h1>
          <div className="border-[1px] w-full border-black my-2 focus:border-none"></div>
          <input
            type="text"
            placeholder="Username"
            className="text-2xl m-4 font-thin focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="text-2xl m-4 font-thin focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="FullName"
            className="text-2xl m-4 font-thin focus:outline-none"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="text-2xl m-4 font-thin focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex">
            <input
              type="url"
              placeholder="Avatar URL"
              className="text-2xl m-4 font-thin focus:outline-none"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="mr-2 h-20 object-cover w-20 rounded-full border-[1px] border-black"
                  />
                ) : (
                  <i class="mr-2 fa-solid fa-user rounded-full border-[1px] w-20 h-20 text-5xl border-black flex items-center justify-center bg-gray-200"></i>
                )}
          </div>
          <textarea
            placeholder="Description"
            rows={4}
            className="text-2xl m-4 font-thin focus:outline-none"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            className="text-2xl hover:bg-red-500 rounded-md bg-red-400 text-white p-2"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                registerUser({
                  username,
                  email,
                  password,
                  fullName,
                  description,
                  avatar,
                })
              );
            }}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
}
export default Registeruser;
