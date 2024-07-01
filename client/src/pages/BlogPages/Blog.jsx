import React from 'react'
import { useNavigate } from "react-router-dom";

const Blog = ({id,desc,imageUrl,owner,title,updatedAt}) => {
  const navigate=useNavigate();
  const handleClick=()=>{
      navigate(`/blog/${id}`)
  }
  return (
    <div onClick={handleClick}>
        <img src={imageUrl} alt={title} />
        <h1 >{title}</h1>
        <img src={owner[0].profile} />
        <h2>{owner[0].username}</h2>
        <h4>{updatedAt}</h4>
    </div>
  )
}

export default Blog