const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
    },
    slug: {
      type: String,
      required: [true, "Post Slug is required"],
    },
    category: {
      type: Array,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672417546/photo_cqdio7.png",
    },
    images: [String],
    banner: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672417546/photo_cqdio7.png",
    },
    shortDesc: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    downloadLink: {
      type: String,
      // required: true,
    },
    buyLink: {
      type: String,
      // required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Post Author is required"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Virtual method to populate created post
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
