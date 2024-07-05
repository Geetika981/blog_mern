import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewComment from "../CommentPages/NewComment";
import Comments from "../CommentPages/Comments";

const BlogById = () => {
  const params = useParams();
  const navigate = useNavigate();
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
  const handleClick = async () => {
    navigate(`/userblog/${blog[0].owner[0]._id}`);
  };
  return (
    <div>
      {!blog ? (
        <h1>Something went wrong</h1>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-hidden">
          <img
            className="h-56 w-1/2 mx-auto"
            src={blog[0].imageUrl}
            alt={blog[0].title}
          />
          <h1 className="text-3xl mx-auto font-bold ">{blog[0].title}</h1>
            <h4 className="text-sm font-bold mx-auto">Last Updated:{blog[0].updatedAt}</h4>
          <p className="w-3/4 mx-auto text-xl">{blog[0].description}</p>
          <div className="flex gap-7 mx-auto" onClick={handleClick}>
            {/* <img className="w-12 h-12 " src={blog[0].owner[0].profile} /> */}
            <h2 className="text-sm mt-3">Blog Contributed by {blog[0].owner[0].username}</h2>
          </div>

          <NewComment  id={id} />
          <h1 className="ml-28 font-bold text-xl ">Comments</h1>
          <Comments id={id}/>

        </div> 
      )}
    </div>
  );
};

export default BlogById;
