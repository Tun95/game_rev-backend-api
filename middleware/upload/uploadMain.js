const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
module.exports = uploadRouter;
