const express = require("express");
const {
  createAds,
  fetchALLCtrl,
  fetchAdvert,
  updateAdverts,
} = require("../../controllers/ads/adsCtrl");

const adsRoutes = express.Router();

adsRoutes.post("/", createAds);
adsRoutes.get("/", fetchALLCtrl);
adsRoutes.get("/:id", fetchAdvert);
adsRoutes.put("/:id", updateAdverts);

module.exports = adsRoutes;
