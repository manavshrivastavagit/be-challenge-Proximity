const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    VideoWebinars: [{ "type": Schema.Types.ObjectId, "ref": "VideoWebinar" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectModel);
