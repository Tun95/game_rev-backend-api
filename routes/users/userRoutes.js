const express = require("express");
const passport = require("passport");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchAllUsersCtrl,
  fetchUserDetailsCtrl,
  deleteUserCtrl,
  updateProfileCtrl,
  blockUsersCtrl,
  unBlockUsersCtrl,
} = require("../../controllers/users/usersCtrl");
const { isAuth, isAdmin } = require("../../middleware/auth/auth");
const generateToken = require("../../config/token/generateToken");

const userRoutes = express.Router();

const CLIENT_URL = "http://localhost:3000/";

userRoutes.post("/register", userRegisterCtrl);

userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchAllUsersCtrl);
userRoutes.get("/details/:id", isAuth, fetchUserDetailsCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.put("/:id", updateProfileCtrl);
userRoutes.put("/block-user/:id", blockUsersCtrl);
userRoutes.put("/unblock-user/:id", unBlockUsersCtrl);

userRoutes.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
      cookies: req.cookies,
      token: generateToken(user.id),
    });
  }
});

userRoutes.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

userRoutes.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect(CLIENT_URL);
  });
});

userRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = userRoutes;
