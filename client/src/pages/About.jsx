import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {
    const {currentuser}=useSelector((state)=>state.user);
  return (
    <div>{currentuser.about}</div>
  )
}

export default About