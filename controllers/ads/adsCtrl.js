const expressAsyncHandler = require("express-async-handler");
const Ads = require("../../models/manageAds/Ads");

//============
// CREATE
//============
const createAds = expressAsyncHandler(async (req, res) => {
  try {
    const adverts = await Ads.create({
      ...req.body,
    });
    res.json(adverts);
  } catch {
    res.json({ message: "Create ads fails" });
  }
});

//============
// FETCH ALL
//============
const fetchALLCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const adverts = await Ads.find({});
    res.json(adverts);
  } catch {
    res.json({ message: "Fetch fail" });
  }
});

//===========
//FETCH SINGLE
//===========
const fetchAdvert = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const ads = await Ads.findById(id);
    res.json(ads);
  } catch {
    res.send({ message: "Failed to fetch" });
  }
});

//===========
//UPDATE
//===========
const updateAdverts = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const adUpdate = await Ads.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(adUpdate);
  } catch {
    res.send({ message: "Failed to update ads" });
  }
});

module.exports = { createAds, fetchALLCtrl, fetchAdvert, updateAdverts };
