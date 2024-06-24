import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogFeed from "./component/blogs/blogFeed.jsx";
import LoginUser from "./component/users/login.jsx";
import CreateBlog from "./component/blogs/createBlog.jsx";
import GetById from "./component/blogs/getById.jsx";
import Registeruser from "./component/users/register.jsx";
import UserProfile from "./component/users/userProfile.jsx";
import OtherUser from "./component/users/otherUser.jsx";
import LandingPage from "./component/pages/landingPage.jsx";
const router = (
  <BrowserRouter>
    {/* <Routes>
      <Route path="/" element={<App/>}>
        <Route path="landing">{<LandingPage />}</Route>
      </Route>
    </Routes> */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<LandingPage />} />
      </Route>
    </Routes>
    <Routes>
      <Route path="/b/" element={<App />}>
        <Route path="blogFeed" element={<BlogFeed />} />
        <Route path="createBlog" element={<CreateBlog />} />
        <Route path="getById/:blogId" element={<GetById />} />
      </Route>
    </Routes>
    <Routes>
      <Route path="/u/" element={<App />}>
        <Route path="register" element={<Registeruser />} />
        <Route path="login" element={<LoginUser />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="otherUser/:userId" element={<OtherUser />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <div className="bg-stone-50"> */}
      <Provider store={store}>{router}</Provider>
    {/* </div> */}
  </React.StrictMode>
);
