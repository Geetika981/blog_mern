import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formdata, setFormdata] = useState({});
  const [error,setError]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  loading } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:4000",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      // console.log(data);
      if (data.success == false) {
        setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.data.user));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const handleChange = (e) => {
    setError(false);
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);
  return (
    <div>
      <form
        className="w-[40%] mx-auto  flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="mx-auto text-3xl uppercase mt-20">Login</h1>
        <input
          id="username"
          className="p-3 mt-10 rounded-xl "
          type="text"
          placeholder="Username or Email"
          onChange={handleChange}
        />
        <input
          id="password"
          className="p-3 rounded-xl "
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="p-3 bg-orange-400 text-white rounded-xl"
          type="submit"
        >
          {loading ? "Loading..." : "Sign-in"}
        </button>
        <div className="flex gap-4">
          <p>Don't have an account?</p>
          <Link to={"/signup"} className="text-blue-900">
            SignUp
          </Link>
        </div>
        <p className="text-red-800 italics">{error && error}</p>
      </form>
    </div>
  );
};

export default SignIn;

