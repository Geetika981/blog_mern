import React from 'react'
import { useNavigate } from "react-router-dom";

const Blog = ({id,desc,imageUrl,owner,title,updatedAt}) => {
  const navigate=useNavigate();
  const handleClick=()=>{
      navigate(`/blog/${id}`)
  }
  return (
    <div className='w-[50%] mx-auto' onClick={handleClick}>
      
        <img className='mx-auto ' src={imageUrl} alt={title} />

        <h1 className='font-bold text-2xl ' >{title}</h1>
        <div className='flex m-5 gap-4 '>
        <img className='w-12 h-12 ' src={owner[0].profile} />
        <h2>{owner[0].username}</h2>
        <h4>{updatedAt}</h4>
        </div>
    </div>
  )
}

export default Blog