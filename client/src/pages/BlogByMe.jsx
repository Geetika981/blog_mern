import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BlogByMe = ({item}) => {
    const [disable, setDisable] = useState(true);
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        setDisable(true)
        e.preventDefault();
        const res=await fetch(`http://localhost:4000/api/v1/blog/update-blog/${item._id}`,{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        // if(data.success===false){
        //     <Navigate to={'/'} />
        //     return;
        // }
        // <Navigate to={'/myblogs'} />
        console.log(data);
      };
      console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
                <img src={item.imageUrl} alt="item.title" />
                <input
                  defaultValue={item.title}
                  disabled={disable}
                  id="title"
                  onChange={handleChange}
                />
                <input
                  defaultValue={item.description}
                  disabled={disable}
                  id="description"
                  onChange={handleChange}
                />
                <button
                  onClick={() => {
                    setDisable(false);
                  }}
                  // hidden={!disable}
                >
                  Updated
                </button>
                <button>Delete</button>
                <button  type="submit">
                  Update
                </button>
              </form>
  )
}

export default BlogByMe