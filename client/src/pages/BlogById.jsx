import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogById = () => {
  const params = useParams();
  const [blog, setBlog] = useState();
  const [error, setError] = useState(false);
  const { id } = params;

  const fetchBlog = async () => {   
    const res = await fetch(
      `http://localhost:4000/api/v1/blog/getBlogById/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.success === false) {
      setError(true);
      return;
    }
    setBlog(data.data);
  };
  useEffect(() => {
    fetchBlog();

  }, []);

  // console.log(blog);
  return (
    <div>
      {!blog ? (
        <h1>Something went wrong</h1>
      ) : (
        <div>
          <img src={blog[0].imageUrl} alt={blog[0].title} />
          <h1>{blog[0].title}</h1>
          <img src={blog[0].owner[0].profile} />
          <h2>{blog[0].owner[0].username}</h2>
          <p>{blog[0].description}</p>
          <h4>{blog[0].updatedAt}</h4>
        </div>
      )}
    </div>  
  );
};

export default BlogById;
