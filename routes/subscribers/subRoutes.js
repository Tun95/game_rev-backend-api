const express = require("express");
const {
  createSubscriber,
  deleteSubscriber,
  fetchALLCtrl,
  sendEmailCtrl,
} = require("../../controllers/subscribers/subscriberCtrl");

const subscriberRoutes = express.Router();

subscriberRoutes.post("/", createSubscriber);
subscriberRoutes.post("/message", sendEmailCtrl);
subscriberRoutes.get("/", fetchALLCtrl);
subscriberRoutes.delete("/:id", deleteSubscriber);

module.exports = subscriberRoutes;
