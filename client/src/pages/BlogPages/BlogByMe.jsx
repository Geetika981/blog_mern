import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const BlogByMe = ({item}) => {
    const navigate=useNavigate();
    const [disable, setDisable] = useState(true);
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    // console.log(formData);
    console.log(item);
    const handleSubmit = async (e) => {
        setDisable(true)
        e.preventDefault();
        const res=await fetch(`http://localhost:4000/api/v1/blog/update-blog/${item._id}`,{
            method:"PATCH",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        console.log(data);
      };
      // console.log(formData);
      const handleUpdateClick=()=>{
        setDisable(false);
      }
      const handleDeleteHandler=async()=>{
        const res=await fetch(`http://localhost:4000/api/v1/blog/deleteblog/${item._id}`,{
          method:"DELETE",
          credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
        })
        const data=await res.json();
        if(data.success===false){
          return;
        }
        navigate('/');
      }
  return (
    <form onSubmit={handleSubmit}>
                <img src={item.imageUrl} alt="item.title" />
                <input
                  defaultValue={item.title}
                  disabled={disable}
                  id="title"
                  onChange={handleChange}
                />
                <textarea
                  defaultValue={item.description}
                  disabled={disable}
                  id="description"
                  onChange={handleChange}
                />
                <div
                  onClick={handleUpdateClick}
                  hidden={!disable}
                >
                  Update
                </div>
                <div onClick={handleDeleteHandler} >Delete</div>
                <button hidden={disable} type="submit">
                  Update 
                </button>
              </form>
  )
}

export default BlogByMe