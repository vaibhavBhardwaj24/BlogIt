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
  
  return (
    <>
    {/* <LoginUser/> */}
    <Outlet/>
    </>
  );
}

export default App;
