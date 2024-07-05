import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getblogs,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice.js";
import Blog from "../BlogPages/Blog.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const naviagte=useNavigate()
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.user);
  const fetchBlogs = async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/blog/getAllBlogs"
    );
    const data = await response.json();
    // console.log(data);
    if (data.success === false) {
      console.log("data fetch error");
    }
    dispatch(getblogs(data.data));
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <ul className=" flex flex-col gap-4 w-[100%]  mx-auto">
      {blogs &&
        blogs.map((item, index) => (
          <li className=" mx-auto m-10 hover:cursor-pointer " key={index}>
            <Blog
              id={item._id}
              desc={item.description}
              imageUrl={item.imageUrl}
              owner={item.owner}
              title={item.title}
              updatedAt={item.updatedAt}
            />
          </li>
        ))}
      {blogs.length===0 && (
        <div className="flex flex-col mx-auto mt-[15%] gap-6">
          <h1 className="font-bold text-4xl mt-20px ">Publish your passions, your way</h1>
          <p className="mx-auto text-xl">Create a unique and beautiful blog easily.</p>
          <button className=" bg-orange-400 p-3 rounded-lg uppercase" onClick={()=>{naviagte('/new-blog')}} >Create Your blog</button>
        </div>
      )}
    </ul>
  );
};

export default Home;
