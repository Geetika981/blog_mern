import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="mx-auto text-3xl uppercase mt-20">About</h1>
      <p className="w-3/4 mx-auto text-xl rounded-lg bg-slate-200 p-5">{currentuser.about}</p>
    </div>
  );
};

export default About;
