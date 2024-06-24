import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../store/users.js";
import { useEffect, useState } from "react";
import { findUser } from "../../store/users.js";
import { Link } from "react-router-dom";
function FindUsers() {
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const isLoading2 = useSelector((state) => state.user.isLoading2);
  const foundUser = useSelector((state) => state.user.foundUser);
  //   useEffect(() => {
  //     setLoad(isLoading2);
  //   }, [isLoading2]);
  return (
    <>
      <input
        type="text"
        // value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        onClick={async (e) => {
          console.log(user);
          dispatch(findUser({ username: user }));
          setTimeout(() => {
            setLoad(false);
          }, 500);

          console.log(foundUser);
        }}
      >
        Search
      </button>
      {load ? (
        <>
          <h1>loading</h1>
        </>
      ) : (
        <>
          <Link to={`/u/otherUser/${foundUser.specificUser._id}`}>{foundUser.specificUser.username}</Link>
        </>
      )}
    </>
  );
}

export default FindUsers;
