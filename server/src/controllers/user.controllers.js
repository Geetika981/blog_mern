import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ApiError(400, "unauthorized access");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, about } = req.body;
  if (!username || !email || !about || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  if (password.length < 8) {
    throw new ApiError(400, "password must be of 8 characters length");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "enter a valid email id");
  }
  const user = await User.create({
    username,
    email,
    password,
    about,
  });
  if (!user) {
    throw new ApiError(500, "internal error while registering user");
  }
  const registeredUser = await User.findById(user._id).select("-password");
  if (!registerUser) {
    throw new ApiError(500, "internal error while registering user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, registeredUser, "user registered successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "invalid credentials");
  }
  const accessToken = await user.generateAccessToken();

  return { accessToken };
};

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalud credentials");
  }

  const { accessToken } = await generateAccessAndRefreshToken(user._id);
  // console.log({accessToken});

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      same_site: "none",
      secure: true,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "user logged in successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, about } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "unauthorized access");
  }

  if (username) {
    const userfnd = await User.findOne({ username });
    if (userfnd) {
      throw new ApiError(
        400,
        "username already exists..please choose unique one"
      );
    }
    user.username = username;
  }
  if (email) {
    const userfnd = await User.findOne({ email });
    if (userfnd) {
      throw new ApiError(400, "email already exists..please choose unique one");
    }
    user.email = email;
  }
  if (about) {
    user.about = about;
  }
  user.save({ validateBeforeSave: false });
  const updatedUser = await User.findById(req.user._id).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "user updated successfully"));
});

export { registerUser, loginUser, logoutUser, updateUser,getUser };
