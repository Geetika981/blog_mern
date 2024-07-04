import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {registerInFailure,
  registerInSuccess,
  registerInStart } from "../../redux/user/userSlice.js"

const SignUp = () => {
  const [error,setError]=useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const {loading}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setError(false);
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setError(false);
      dispatch(registerInStart())
      const response = await fetch(
        "http://localhost:4000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await response.json();
      if (data.success == false) {
        setError(data.message);
        dispatch(registerInFailure(data.message));
        return;
      }
      dispatch(registerInSuccess())
      console.log(data);
      navigate("/signin");
    } catch (error) {
      dispatch(registerInFailure(error))
      console.log(error);
      // navigate('/signup')
    }
  };
  return (
    <div className="w-[40%] mx-auto  flex flex-col gap-4">
      <h1 className="mx-auto text-3xl uppercase mt-20">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          id="username"
          className="p-3 mt-10 rounded-xl"
          type="text"
          placeholder="Username "
          onChange={handleChange}
        />
        <input
          id="email"
          className="p-3 rounded-xl"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          id="password"
          className="p-3 rounded-xl "
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <textarea
          id="about"
          className="p-3 rounded-xl "
          type="text"
          placeholder="Tell us more about Yourself"
          onChange={handleChange}
        />
        <button className="p-3 bg-orange-400 text-white rounded-xl" type="submit">
        {loading ? "Loading..." : "Sign-up"}
        </button>
      </form>
      <div className="flex gap-4">
        <p className="">Already have an account?</p>
        <Link to={"/signin"} className="font-serif text-blue-900 ">
          SignIn
        </Link>
      </div>
      <p className="text-red-900">{error && error}</p>
    </div>
  );
};

export default SignUp;
