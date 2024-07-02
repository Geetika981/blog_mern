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
    <ul className="">
      {blogs &&
        blogs.map((item, index) => (
          <li className="" key={index}>
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
        <div className="h-100vh flex flex-col gap-10">
          <h1 className="font-bold text-3xl mt-20px ">No Blogs to show..</h1>
          <p>Be the first to show your creativity on any topic..</p>
          <button onClick={()=>{naviagte('/new-blog')}} >Click here to create the blog</button>
        </div>
      )}
    </ul>
  );
};

export default Home;
