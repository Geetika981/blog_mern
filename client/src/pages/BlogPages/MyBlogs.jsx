import React, { useEffect, useState } from "react";
import BlogByMe from "./BlogByMe";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState();

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/api/v1/blog/get-my-blogs", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    setBlogs(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(blogs[0]._id);

  return (
    <ul>
      {blogs && (
        <div>
          {blogs.map((item, index) => (
            <li key={index}>
              <BlogByMe item={item}/>
            </li>
          ))}
        </div>
      )}
      {!blogs && <h1>No Blogs created</h1>}
    </ul>
  );
};

export default MyBlogs;
