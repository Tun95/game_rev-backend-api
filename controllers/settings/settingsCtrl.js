const expressAsyncHandler = require("express-async-handler");
const Settings = require("../../models/settings/Settings");

//===========
//CREATE
//===========
const createSettings = expressAsyncHandler(async (req, res) => {
  try {
    const settings = await Settings.create({
      ...req.body,
    });
    res.json(settings);
  } catch {
    res.send({ message: "Failed to create Settings" });
  }
});

//=============
//FETCH ALL CATEGORY
//=============
const fetchAllSettings = expressAsyncHandler(async (req, res) => {
  try {
    const settings = await Settings.find({});
    res.json(settings);
  } catch {
    res.send({ message: "Fail to fetch" });
  }
});

//===========
//FETCH
//===========
const fetchSettings = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const settings = await Settings.findById(id);
    res.json(settings);
  } catch {
    res.send({ message: "Failed to create Settings" });
  }
});

//===========
//UPDATE
//===========
const updateSettings = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const settings = await Settings.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(settings);
  } catch {
    res.send({ message: "Failed to update Settings" });
  }
});

module.exports = {
  createSettings,
  fetchAllSettings,
  fetchSettings,
  updateSettings,
};
