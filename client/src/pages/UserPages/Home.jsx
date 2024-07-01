import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getblogs,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice.js";
import Blog from "../BlogPages/Blog.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.user);
  const fetchBlogs = async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/blog/getAllBlogs"
    );
    const data = await response.json();
    console.log(data);
    if (data.success === false) {
      console.log("data fetch error");
    }
    dispatch(getblogs(data.data));
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <ul>
      {blogs &&
        blogs.map((item, index) => (
          <li key={index}>
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
    </ul>
  );
};

export default Home;
