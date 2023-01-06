const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/category/Category");
const validateMongodbId = require("../../utils/validateMongodbId");

//=============
//CREATE CATEGORY
//=============
const createCategory = expressAsyncHandler(async (req, res) => {
  //get user
  const user = req?.user;
  const { category } = req?.body;
  try {
    const createCate = await Category.create({
      category,
      user,
    });
    res.json(createCate);
  } catch (error) {
    res.json(error);
  }
});

//=============
//FETCH ALL CATEGORY
//=============
const fetchAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort("-createdAt")
      .populate("user");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//=============
//FETCH ALL ALPHA. CATEGORY
//=============
const fetchAlphaCategory = expressAsyncHandler(async (req, res) => {
  const mysort = { category: 1 };
  try {
    const categories = await Category.find({}).sort(mysort).populate("user");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//=============
//FETCH SINGLE CATEGORY
//=============
const fetchCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("user");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//=============
//UPDATE CATEGORY
//=============
const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        category: req?.body?.category,
      },
      { new: true, runValidators: true }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//=============
//DELETE CATEGORY
//=============
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategory,
  fetchAllCategory,
  fetchAlphaCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
};
