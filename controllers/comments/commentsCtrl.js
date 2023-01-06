const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/Comment");

//=============
//CREATE COMMENT
//=============
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //Get User
  const user = req?.user;
  //get post Id
  const { postId, description } = req.body;
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
      parentId: null,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//=============
//FECTH ALL COMMENT
//=============
const fetchAllComment = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({})
      .sort("-createdAt")
      .populate("user post");
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

//=============
//FECTH SINGLE COMMENT
//=============
const fetchSingleComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id).populate("user");
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//=============
//UPDATE COMMENT
//=============
const updateComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        post: req?.body?.postId,
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//=============
//DELETE COMMENT
//=============
const deleteComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id).populate("user");
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCommentCtrl,
  fetchAllComment,
  fetchSingleComment,
  updateComment,
  deleteComment,
};
