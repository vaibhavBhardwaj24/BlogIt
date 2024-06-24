import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../store/comment";
function Comments({ blogId }) {
  const comm = useSelector((state) => state.comment.allComments);
  const isLoading = useSelector((state) => state.comment.isLoading);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accToken");
    if (token !== null && token !== undefined) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    // console.log(token);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  return (
    <div className="flex w-full  text-2xl">
      <input
        type="text"
        value={comment}
        placeholder="Write your thoughts  "
        className="font-thin w-full focus:outline-none"
        onChange={(e) => {
          // console.log(comment);
          setComment(e.target.value);
        }}
      />
      <button
        className="w-1/6 bg-red-400 text-white font-thin rounded-md"
        onClick={() => {
          if (logged) {
            console.log(comment);
            dispatch(postComment({ comment: comment, blogId: blogId }));
          } else {
            console.log("else");
            navigate("/u/login");
          }
        console.log();
        }}
      >
        Post
      </button>

      {/* <div className="border-[1px] border-gray-300 m-1 md:w-4/6 w-11/12 mt-4"></div> */}
    </div>
  );
}

export default Comments;
