import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import axios from "axios";
import { allBlogs, createBlog, getBlogById } from "./store/blogs.js";
import LoginUser from "./component/users/login.jsx";
import { Outlet } from "react-router-dom";
function App() {
  const [blogs, setBlogs] = useState({});
  const [load, setLoad] = useState(true);
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const findBlog = useSelector((state) => state.allBlogs.findBlog);
  const isLoading2 = useSelector((state) => state.user.isLoading2);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  useEffect(() => {
    // Apply dark mode class to body element
    document.body.classList.add("dark");
    document.body.classList.add("h-full");
    
  }, []);
  return (
    <>
      {/* <LoginUser/> */}
      <div className="bg-dot-/[0.2] antialiased h-full  text-white">
        <Outlet className="" />
       
      </div>
    </>
  );
}

export default App;
