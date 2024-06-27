import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";
import { cn } from "../../utils/cn.ts";
import { loginUser, logoutUser } from "../../store/users.js";
import { Link } from "react-router-dom";
import Navbar from "../pages/navbar.jsx";
import { Spotlight } from "../ui/Spotlight.tsx";
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
      console.log(JSON.stringify(loggedUser.username));
      localStorage.setItem("accToken", JSON.stringify(loggedUser.accToken));
      localStorage.setItem("specificUser", JSON.stringify(loggedUser.specificUser));
      // localStorage.setItem("username", JSON.stringify(loggedUser.username));
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

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  // Installation;
  return (
    <>
      <Navbar />

      <div className="bg-dot-white/[0.2] h-[100vh] items-center flex">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-[1px] border-white/[0.46]  ">
          <h1 className="text-7xl font-bold bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 text-transparent p-6 flex justify-center w-full">
            Log In
          </h1>
          <form action="" className="my-8">
            <div className="flex flex-col md:flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-4 ">
              <div className={cn("flex flex-col space-y-2 w-full")}>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="TylerDurden123"
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
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
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
                Log In
                <BottomGradient />
              </button>
            </div>
          </form>
          <p className="w-full flex justify-center">
            Dont have an account?{" "}
            <Link to={"/u/register"} className="hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default LoginUser;
