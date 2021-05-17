const TagsModel = require("../models/TagsModel");
let apiResponse = require("../helpers/apiResponse");
const Logger = require("../configs/winston");
const {
  body,
  validationResult,
  sanitizeBody,
  check,
} = require("express-validator");

let mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

mongoose.set("useFindAndModify", false);

/**
 * Search Tags by Title.
 *
 * @returns {Object}
 */
exports.searchTagsByTitle = function (tagTitles) {
  let query = {};
  let queryList = [];
  tagTitles.forEach(tagTitle => {
    queryList.push({title: tagTitle});
  });
  
  query.$or = queryList;

  TagsModel.find(query)
    .exec(function (err, tags) {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }
      return tags;
    });
};

/**
 * Create Tags Models
 *
 * @returns {array}
 */
exports.getTagsModels = function (tags) {
    // Logger.info(tags)
    let tagsList = tags.split(',');
    let TagsModels = [];
    tagsList.forEach(tag =>{
        // Logger.info(tag)
        let tagsModel = new TagsModel({
            title: tag.trim()
          });
          TagsModels.push(tagsModel)
    });
    return TagsModels;
};