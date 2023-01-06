const express = require("express");
const {
  createSettings,
  updateSettings,
  fetchSettings,
  fetchAllSettings,
} = require("../../controllers/settings/settingsCtrl");
const { isAuth } = require("../../middleware/auth/auth");

const settingsRoutes = express.Router();

settingsRoutes.post("/", createSettings);
settingsRoutes.get("/", fetchAllSettings);
settingsRoutes.get("/:id", isAuth, fetchSettings);
settingsRoutes.put("/:id", isAuth, updateSettings);

module.exports = settingsRoutes;
