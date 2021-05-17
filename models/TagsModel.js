const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsModel = new mongoose.Schema(
  {
    title: { type: String} 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tags", TagsModel);
