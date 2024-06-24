import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../store/blogs";
import "./createBlog.css";
import LoggedInNavbar from "../pages/loggedInNavbar";
function CreateBlog() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [coverURL, setCover] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setFilePath(file.path);
    }
  };
  const loggedUser = useSelector((state) => state.user.loggedUser);
  return (
    <>
      <LoggedInNavbar />
      <div className=" flex h-full flex-col w-full items-center justify-center pt-4 font-serif">
        <form className="flex flex-col h-full w-10/12 md:w-1/2 text-5xl justify-start items-start">
          <h1 className="flex justify-center border-b-2 w-full p-4 border-slate-500">
            Post a Blog
          </h1>

          <textarea
            type="text"
            value={title}
            className=" focus:outline-none h-auto text-nowrap my-4"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            rows={20}
            type="text"
            className="text-xl w-full  focus:outline-none  "
            placeholder="Tell your story"
            value={article}
            onChange={(e) => {
              setArticle(e.target.value);
            }}
          />
          <div className="flex">
            <div className="cntr flex-1 flex items-center justify-center text-[0.5em]">
              Public:
              <input
                type="checkbox"
                id="cbx"
                className="hidden-xs-up   "
                checked={isPublic}
                onChange={(e) => {
                  setIsPublic(e.target.checked);
                }}
              />
              <label for="cbx" className="cbx mx-4"></label>
            </div>
            <input
              type="text"
              className=" w-full flex-1"
              placeholder="Paste URL "
              value={coverURL}
              onChange={(e) => {
                setCover(e.target.value);
              }}
            />
          </div>
          {coverURL ? (
            <div className="flex justify-around w-full">
              <p> Preview</p>
              <div className=" ">
                <img
                  src={coverURL}
                  alt=""
                  className="h-[3em] w-[3em] md:w-[6em] md:h-[6em] object-cover"
                />
              </div>
            </div>
          ) : (
            <>{/* <h1>jsjsjs</h1> */}</>
          )}
          <div className="flex w-full justify-center">
            <button
              className="bg-red-400 text-slate-50 hover:bg-red-500 w-1/2 m-7 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setFilePath("");
                dispatch(
                  createBlog({
                    title,
                    article,
                    isPublic,
                    coverURL,
                  })
                );
              }}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateBlog;
