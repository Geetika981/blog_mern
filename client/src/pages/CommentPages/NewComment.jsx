import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NewComment = ({ id }) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/v1/comments/create-comment/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    setFormData("");

    if (data.success === false) {
      setError(data.message);
      return;
    }
    // console.log(data);
      navigate(`/blog/${id}`)
    };
  return (
    <form className="mx-auto flex gap-8" onSubmit={handleSubmit}>
      <input
        type="text"
        className="p-3 w-[100%] rounded-xl "
        placeholder="Write a comment here..."
        id="content"
        onChange={handleChange}
      />
      <button
        className="font-bold bg-orange-300 p-3 rounded-lg focus:outline-none"
        type="Submit"
      >
        Comment
      </button>
    </form>
  );
};

export default NewComment;
