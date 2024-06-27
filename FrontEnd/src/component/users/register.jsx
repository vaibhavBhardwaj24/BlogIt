import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";
import { registerUser } from "../../store/users.js";
import Navbar from "../pages/navbar.jsx";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn.ts";
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

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="bg-dot-white/[0.2] h-full items-center flex">
        <div className=" md:w-3/6 mx-auto  md:rounded-2xl p-4 md:p-8 rounded-xl shadow-input bg-white dark:bg-black border-[1px] border-white/[0.46]  ">
          <h1 className="text-7xl font-bold bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 flex justify-center w-full">
            Sign Up
          </h1>
          <form action="" className="my-8">
            <div className="flex flex-col md:flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-4 ">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-4">
                <div className="md:flex-1">
                  <div className={cn("flex flex-col space-y-2 w-full")}>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Tyler Durden"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className={cn("flex flex-col space-y-2 w-full")}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="TylerDurden@mayham"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div className={cn("flex flex-col space-y-2 w-full")}>
                    <Label htmlFor="pass">Password</Label>
                    <Input
                      id="pass"
                      placeholder="****"
                      type="text"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="md:flex-1">
                  <div className={cn("flex flex-col space-y-2 w-full")}>
                    <Label htmlFor="Fname">Full Name</Label>
                    <Input
                      id="Fname"
                      placeholder="Tyler Durdern"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row w-full">
                    <div className={cn("flex flex-col space-y-2 w-ful md:pr-8")}>
                      <Label htmlFor="url">Avatar URL</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="Avatar URL"
                        value={avatar}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setAvatar(e.target.value);
                        }}
                      />
                    </div>
                    {avatar ? (
                      <img
                        src={avatar}
                        alt=""
                        className="mr-2 h-20 object-cover w-20 rounded-full border-[1px] border-black"
                      />
                    ) : (
                      <i class="mr-2 fa-solid fa-user rounded-full border-[1px] w-20 h-20 text-5xl text-black border-black flex items-center justify-center bg-gray-200"></i>
                    )}
                  </div>
                  <div className={cn("flex flex-col space-y-2 w-full")}>
                    <Label htmlFor="desc">Description</Label>
                    <Input
                      id="desc"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
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
                Submit
                <BottomGradient />
              </button>
            </div>
          </form>
          <p className="w-full flex justify-center">
            Already have an account?{" "}
            <Link to={"/u/login"} className="hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Registeruser;
