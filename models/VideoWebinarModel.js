const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoWebinarModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    tags: [{ type: String, required: true }],
    contentType: { type: String, required: true },
    viewsCount: { type: Number,default:0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoWebinar", VideoWebinarModel);
