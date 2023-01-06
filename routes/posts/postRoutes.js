const express = require("express");
const {
  createPostCtrl,
  fetchAllPostCtrl,
  filterAllPostCtrl,
  relatedPostCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  fetchSummary,
  fetchDownLinkCtrl,
  fetchAdminPostCtrl,
  fetchTopDownloadCtrl,
} = require("../../controllers/posts/postsCtrl");
const { isAuth, isAdmin } = require("../../middleware/auth/auth");

const postRoutes = express.Router();

postRoutes.post("/", isAuth, createPostCtrl);
postRoutes.get("/", fetchAllPostCtrl);
postRoutes.get("/topDownloads", fetchTopDownloadCtrl);
postRoutes.get("/download/:id", fetchDownLinkCtrl);
postRoutes.get("/summary", fetchSummary);
postRoutes.get("/related/:id", relatedPostCtrl);
postRoutes.get("/home", filterAllPostCtrl);
postRoutes.get("/:id", fetchPostCtrl);
postRoutes.get("/admin/:id", fetchAdminPostCtrl);
postRoutes.put("/:id", isAuth, updatePostCtrl);
postRoutes.delete("/:id", isAuth, deletePostCtrl);

module.exports = postRoutes;
