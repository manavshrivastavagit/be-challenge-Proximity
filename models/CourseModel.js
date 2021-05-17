const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjects: [{ "type": Schema.Types.ObjectId, "ref": "Subject" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseModel);
