const WebinarModel = require("../models/VideoWebinarModel");
let apiResponse = require("../helpers/apiResponse");
const Logger = require("../configs/winston");
const {
  body,
  validationResult,
  sanitizeBody,
  check,
} = require("express-validator");

let mongoose = require("mongoose");
const TagsService = require("../services/TagsService");

const multer = require("multer");
const path = require("path");
const TagsModel = require("../models/TagsModel");

mongoose.set("useFindAndModify", false);

/**
 * Search Webinar by title.
 *
 * @returns {Object}
 */
exports.searchWebinarByTitle = [
  function (req, res) {
    Logger.info("search videos in progress..");
    try {
      const perPage = parseInt(req.query.perpage) || 5;
      Logger.info(req.query.perpage);
      const page = Math.max(0, parseInt(req.query.page) - 1 || 0);
      Logger.info(req.query.page);

      const videoTitle = req.query.title || false;
      Logger.info(videoTitle);
      if (!videoTitle) {
        return apiResponse.ErrorResponse(res, "Enter Webinar Title");
      }

      let query = {};
      query.title = { $regex: videoTitle, $options: "i" };

      Logger.info(query);

      const sortby = req.query.sortBy || "title";
      const sortOrder = req.query.sortOrder || "asc";
      let sortByQuery = {};
      sortByQuery[sortby] = sortOrder;

      Logger.info(sortByQuery);

      WebinarModel.find(query)
        .select(["id", "title", "createdAt", "updatedAt"])
        .limit(perPage)
        .skip(perPage * page)
        .sort(sortByQuery)
        .exec(function (err, videos) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          WebinarModel.countDocuments(query).exec(function (err, count) {
            if (err) {
              return apiResponse.ErrorResponse(res, err);
            }
            console.error("search videos completed");
            // get videos with tags title
            // let tagsData = getTags();
            // let tagsData = TagsService.searchTagsByTitle(videos);
            return apiResponse.successResponseWithData(res, "success", {
              videos: videos,
              currentPageNumber: page + 1,
              totalPages: Math.ceil(count / perPage),
              perPage: perPage,
              totalWebinars: count,
            });
          });
        });
    } catch (err) {
      console.error("search videos Error not completed", err);
      // throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 *
 * Multer config for video upload
 *
 */
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("webinar");

function checkFileType(file, cb) {
  const fileTypes = /mp4|avi/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: videos only");
  }
}

/**
 * Upload a Webinar
 *
 * @returns {Object}
 */
exports.uploadWebinar = [
  function (req, res) {
    upload(req, res, (err) => {
      if (err) {
        Logger.error(err);
      } else {
        if (req.file == undefined) {
          Logger.error("Error: no file selected");
        } else {
          const title = req.body.title;
          const tags = req.body.tags;

          let { filename, path } = req.file;
          const post = {
            title: title,
            filename: filename,
            filepath: path,
          };
          Logger.info(post);

          const tagsList = tags.trim().split(",");

          videoModel = new WebinarModel({
            title: title,
            filename: filename,
            path: path,
            tags: tagsList,
            contentType: "webinar",
          });

          // save webinar info
          videoModel.save((err) => {
            if (err) {
              Logger.error(err);
              const errorMessage = "uploading Webinar not completed";
              Logger.error(
                "uploadWebinar not completed. Error on save uploadWebinar"
              );
              return apiResponse.ErrorResponse(res, errorMessage);
            }

            Logger.info("webinar uploadWebinar completed");

            return apiResponse.successResponseWithData(
              res,
              "Webinar uploaded successfully.",
              post
            );
          });
        }
      }
    });
  },
];
