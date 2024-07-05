import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ id, desc, imageUrl, owner, title, updatedAt }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className="flex gap-24 mx-auto" onClick={handleClick}>
      <img className="h-2/4" src={imageUrl} alt={title} />
      <div className="mt-8">
        <h1 className="font-bold text-2xl italic">{title}</h1>
        <div className=" flex gap-3 ">
          <img className="w-12 h-12 rounded-full " src={owner[0].profile} />
          <h2 className="my-3 text-sm">{owner[0].username}</h2>
          <h4 className="my-3 text-sm">{updatedAt}</h4>
        </div>
      </div>
    </div>
  );
};

export default Blog;
