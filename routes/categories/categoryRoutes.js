const express = require("express");
const {
  createCategory,
  fetchAllCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
  fetchAlphaCategory,
} = require("../../controllers/category/categoryCtrl");
const { isAuth } = require("../../middleware/auth/auth");

const categoryRoutes = express.Router();

categoryRoutes.post("/", isAuth, createCategory);
categoryRoutes.get("/", fetchAllCategory);
categoryRoutes.get("/alphatical", fetchAlphaCategory);
categoryRoutes.get("/:id",isAuth, fetchCategory);
categoryRoutes.put("/:id",isAuth, updateCategory);
categoryRoutes.delete("/:id",isAuth, deleteCategory);

module.exports = categoryRoutes;
