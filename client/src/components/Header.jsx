import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";
const Header = () => {
  const { currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const response = await fetch("http://localhost:4000/api/v1/user/logout");
    const data = await response.json();
    dispatch(logoutSuccess());
  };
  return (
    <div className="bg-orange-200 w-[100%]">
      <header className="flex justify-between mx-auto  w-[90%]">
        <div className=" text-3xl cursor-pointer font-bold p-3">
          <Link to={"/"}> Blog </Link>
        </div>

        {currentuser ? (
          <ul className="flex gap-4 my-4">
            <Link to={"/new-blog"}>
              <li>NewBlog</li>
            </Link>
            <Link to={"/myblogs"}>
              <li>MyBlogs</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/profile"}>
              <li>Profile</li>
            </Link>
          </ul>
        ) : (
          <ul className="flex gap-10 p-3 font-bold cursor-pointer text-xl">
            <Link to={"/signin"}>
              <li>Sign-in</li>
            </Link>
            <Link to={"/signup"}>
              <li>Sign-up</li>
            </Link>
          </ul>
        )}
      </header>
    </div>
  );
};

export default Header;
