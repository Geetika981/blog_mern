import React, { useState } from "react";
import {
  logoutSuccess,
  updateuserFailure,
  updateuserStart,
  updateuserSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState({});
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      dispatch(updateuserStart());
      const res = await fetch(
        `http://localhost:4000/api/v1/user/updateAccountDetails`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateuserFailure(data.message));
      }
      dispatch(updateuserSuccess(data.data));
      // navigate('/todos');
    } catch (error) {
      dispatch(updateuserFailure(error));
    }
  };
  return (
    <div className="w-[50%] mx-auto  flex flex-col gap-4">
      <h1 className="mx-auto text-3xl uppercase my-[7%]">Update Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          // id="email"
          defaultValue={currentuser.email}
          className="p-3 rounded-xl"
          disabled
          type="text"
          placeholder="email"
          // onChange={handleChange}
        />
        <input
          id="username"
          defaultValue={currentuser.username}
          className="p-3 rounded-xl"
          disabled={disabled}
          type="text"
          placeholder="username "
          onChange={handleChange}
        />
        <textarea
          id="about"
          disabled={disabled}
          defaultValue={currentuser.about}
          className="p-3 rounded-xl "
          type="text"
          placeholder="about"
          onChange={handleChange}
        />
        <button
          className="p-3 bg-blue-600 text-white rounded-xl"
          onClick={() => setDisabled(false)}
          hidden={!disabled}
        >
          UPDATE
        </button>
        <button
          hidden={disabled}
          className="p-3 bg-blue-600 text-white rounded-xl"
          type="submit"
        >
          UPDATE
        </button>
      </form>
      <button
        className="p-3 bg-red-600 text-white rounded-xl"
        onClick={logoutHandler}
      >
        logout
      </button>
    </div>
  );
};

export default Profile;
