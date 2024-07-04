import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
    const [error,setError]=useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/v1/blog/create-blog", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    // console.log(data);
    if (data.success === false) {
        setError(data.message);
      return;
    }
    navigate("/");
  };
  return (
    <form
      className="w-[50%] mx-auto  flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto text-3xl uppercase mt-20">Create a new blog</h1>
      <input
        id="title"
        className="p-3 mt-10 rounded-xl "
        type="text"
        placeholder="Title"
        onChange={handleChange}
      />

      <textarea
        placeholder="Content"
        className="p-3 rounded-xl h-44 overflow-y-hidden "
        id="description"
        onChange={handleChange}
      />
      <button
        className="p-3 bg-orange-400 text-white rounded-xl uppercase"
        type="submit"
      >
        PUBLISH The Blog
      </button>
      {error && <p className="text-red-900">{error}</p>}
    </form>
  );
};

export default NewBlog;
