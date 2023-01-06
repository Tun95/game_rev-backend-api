const express = require("express");
const {
  createCommentCtrl,
  fetchAllComment,
  fetchSingleComment,
  updateComment,
  deleteComment,
} = require("../../controllers/comments/commentsCtrl");
const { isAuth } = require("../../middleware/auth/auth");

const commentRoutes = express.Router();

commentRoutes.post("/:id", isAuth, createCommentCtrl);
commentRoutes.get("/", fetchAllComment);
commentRoutes.get("/:id",isAuth, fetchSingleComment);
commentRoutes.put("/:id", isAuth, updateComment);
commentRoutes.delete("/:id", isAuth, deleteComment);

module.exports = commentRoutes;
