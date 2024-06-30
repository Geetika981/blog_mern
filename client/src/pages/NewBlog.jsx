import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const NewBlog = () => {
    const [formData,setFormData]=useState({})
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch('http://localhost:4000/api/v1/blog/create-blog',{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        if(data.success===false){
            return;
        }
        <Navigate to={'/myblogs'} />
    }
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Title' id='title' onChange={handleChange}  />
        <textarea placeholder='Content' id='description' onChange={handleChange} />
        <button type="submit" className="uppercase">
            PUBLISH The Blog
        </button>
    </form>
  )
}

export default NewBlog