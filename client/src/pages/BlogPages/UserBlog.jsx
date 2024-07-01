import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Blog from './Blog';

const UserBlog = () => {
    const params=useParams();
    const [blogs,setBlogs]=useState();
    const {id}=params;
    const fetchUserBlogs=async()=>{
        const res=await fetch(`http://localhost:4000/api/v1/blog/getUserBlog/${id}`,{
            method:"GET",
            credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
          })
          const data=await res.json();
        setBlogs(data.data);
    }
    useEffect(()=>{
        fetchUserBlogs();
    },[])
  return (
    <ul>
    {blogs &&
      blogs.map((item, index) => (
        <li key={index}>
          <Blog
            id={item._id}
            desc={item.description}
            imageUrl={item.imageUrl}
            owner={item.owner}
            title={item.title}
            updatedAt={item.updatedAt}
          />
        </li>
      ))}
  </ul>
  )
}

export default UserBlog