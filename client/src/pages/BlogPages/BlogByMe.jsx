import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const BlogByMe = ({ item }) => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  // console.log(item);
  const handleSubmit = async (e) => {
    setDisable(true);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/v1/blog/update-blog/${item._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    // console.log(data);
  };
  // console.log(formData);
  const handleUpdateClick = () => {
    setDisable(false);
  };
  const handleDeleteHandler = async () => {
    const res = await fetch(
      `http://localhost:4000/api/v1/blog/deleteblog/${item._id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    navigate("/");
  };
  return (
    <form
      className="w-[50%] mx-auto  flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto text-3xl uppercase mt-20">My blogs</h1>
      <img className="h-56 w-1/2 mx-auto" src={item.imageUrl} alt="item.title" />
      <input
        defaultValue={item.title}
        className="p-3 mt-10 rounded-xl "
        disabled={disable}
        id="title"
        onChange={handleChange}
      />
      <textarea
        defaultValue={item.description}
        className="p-3 rounded-xl h-44 overflow-y-hidden "
        disabled={disable}
        id="description"
        onChange={handleChange}
      />
      <div className="flex gap-6">
      <div className="bg-green-500 p-4 rounded-lg" onClick={handleUpdateClick} hidden={!disable}>
        Update
      </div>
      <div className="bg-red-500 p-4 rounded-lg" onClick={handleDeleteHandler}>Delete</div>
      <button className="bg-green-500 p-4 rounded-lg" hidden={disable} type="submit">
        Update
      </button>
      </div>
    </form>
  );
};

export default BlogByMe;
