const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/Comment");
const Post = require("../../models/post/Post");
const Subscriber = require("../../models/subscriber/Subscriber");
const User = require("../../models/user/User");
const validateMongodbId = require("../../utils/validateMongodbId");

//============
// Create Post
//============
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//============
// Fetch all Post
//============
const fetchSummary = expressAsyncHandler(async (req, res) => {
  //GET MONTHLY USERS STATS
  const subscribers = await Subscriber.aggregate([
    {
      $group: {
        _id: 1,
        numSubscribers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  //GET DAILY INCOME
  const dailySummary = await Post.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        downloads: { $sum: "$downloadCount" },
        totalViews: { $sum: "$numViews" },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  //GET DAILY INCOME
  const posts = await Post.aggregate([
    {
      $group: {
        _id: 1,
        totalPosts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.send({ subscribers, dailySummary, posts });
});

//============
// Fetch all Post
//============
const fetchAllPostCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).sort("-createdAt").populate("comments");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

//============
// Fetch TOP DOWNLOADS
//============
const fetchTopDownloadCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const downloads = await Post.find({}).sort("-downloadCount").limit(5);
    res.json(downloads);
  } catch (error) {
    res.json(error);
  }
});

//============
// Filter Posts
//============
const PAGE_SIZE = 8;
const filterAllPostCtrl = expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          title: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};

  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const posts = await Post.find({
    ...queryFilter,
    ...categoryFilter,
  })
    .populate("user")
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countPosts = await Post.countDocuments({
    ...queryFilter,
    ...categoryFilter,
  });
  res.json({
    posts,
    countPosts,
    page,
    pages: Math.ceil(countPosts / pageSize),
  });

  // const { query } = req;
  // const pageSize = query.pageSize || PAGE_SIZE;
  // const page = query.page || 1;
  // const category = query.category || "";
  // const searchQuery = query.query || "";

  // const queryFilter =
  //   searchQuery && searchQuery !== "all"
  //     ? {
  //         name: {
  //           $regex: searchQuery,
  //           $options: "i",
  //         },
  //       }
  //     : {};
  // const categoryFilter = category && category !== "all" ? { category } : {};

  // const posts = await Post.find({
  //   ...queryFilter,
  //   ...categoryFilter,
  // })
  //   .sort("-createdAt")
  //   .skip(pageSize * (page - 1))
  //   .limit(pageSize);

  // const countPosts = await Post.countDocuments({
  //   ...queryFilter,
  //   ...categoryFilter,
  // });
  // res.json({
  //   posts,
  //   countPosts,
  //   page,
  //   pages: Math.ceil(countPosts / pageSize),
  // });
});

//============
// Fetch Related Post
//============
const relatedPostCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const related = await Post.find({
      _id: { $ne: post },
      category: post.category,
    })
      .limit(6)
      .populate("category", "name");

    res.json(related);
  } catch (err) {
    console.log(err);
  }
});

//============
// Fetch single Post
//============
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate("user comments");
    //Updating Number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//============
// Fetch Admin Post
//============
const fetchAdminPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate("user comments");
    //Updating Number of views
    await Post.findByIdAndUpdate(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//============
// Fetch Download Link
//============
const fetchDownLinkCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate("user comments");
    //Updating Number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { downloadCount: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//============
// Update Post
//============
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//============
// Delete Post
//============
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createPostCtrl,
  fetchAllPostCtrl,
  filterAllPostCtrl,
  fetchDownLinkCtrl,
  fetchTopDownloadCtrl,
  fetchSummary,
  relatedPostCtrl,
  fetchPostCtrl,
  fetchAdminPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
};
