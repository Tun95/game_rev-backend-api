const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../models/user/User");
const validateMongodbId = require("../../utils/validateMongodbId");
const axios = require("axios");

//==============
//Register
//==============
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    throw new Error("User already exist");
  }
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//==============
//Login
//==============
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

//==============
//Fetch all users
//==============
const fetchAllUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).sort("-createdAt");
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//==============
//Fetch user details
//==============
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("posts");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//==============
//Delete user
//==============
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id, {
      new: true,
      runValidators: true,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//==============
//Update profile
//==============
const updateProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        profilePhoto: req?.body?.profilePhoto,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

//===============
//Block User
//===============
const blockUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//===============
//unBlock User
//===============
const unBlockUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchAllUsersCtrl,
  fetchUserDetailsCtrl,
  deleteUserCtrl,
  updateProfileCtrl,
  blockUsersCtrl,
  unBlockUsersCtrl,
};
