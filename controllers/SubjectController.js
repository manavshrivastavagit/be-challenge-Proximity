const SubjectModel = require("../models/SubjectModel");
let apiResponse = require("../helpers/apiResponse");
const Logger = require("../configs/winston");
const {
  body,
  validationResult,
  sanitizeBody,
  check,
} = require("express-validator");

let mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

/**
 * Create a new Subject
 *
 * @returns {Object}
 */
exports.createSubject = [
  // Validate fields.
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("title must be specified."),

  // Sanitize fields.
  sanitizeBody("title").escape(),

  function (req, res) {
    validationResult(req).throw();

    subjectModel = new SubjectModel({
      title: req.body.title,
      VideoWebinars: req.body.VideoWebinars,
    });

    // save Subject info
    subjectModel.save((err, Subject) => {
      if (err) {
        Logger.error(err);
        const errorMessage = "Subject not created";
        Logger.error("Subject not created. Error on save Subject");
        return apiResponse.ErrorResponse(res, errorMessage);
      }

      Logger.info("Subject created");

      return apiResponse.successResponseWithData(
        res,
        "Subject created successfully.",
        Subject
      );
    });
  },
];

/**
 * Get Subject Info By Id
 *
 * @param {string} id
 *
 * @returns {Object}
 */
exports.SubjectInfoById = [
  function (req, res) {
    Logger.info("getting Subject info by SubjectId in progress..");
    if (!mongoose.Types.ObjectId.isValid(req.params.SubjectId)) {
      return apiResponse.ErrorResponse(res, "Invalid Subject Id");
    }
    try {
      // get Subjects info by SubjectId
      SubjectModel.findById(req.params.SubjectId, (err, SubjectInfo) => {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }

        Logger.info("getting Subject info by SubjectId completed");
        return apiResponse.successResponseWithData(
          res,
          "Subject info By Id",
          SubjectInfo
        );
      });
    } catch (err) {
      console.error(err);
      // throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * update Subject Info By Id
 *
 * @returns {Object}
 */
exports.updateSubjectInfoById = [
  // Validate fields.
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("title must be specified."),

  // Sanitize fields.
  sanitizeBody("title").escape(),

  function (req, res) {
    Logger.info(" in progress..");
    try {
      validationResult(req).throw();

      if (!mongoose.Types.ObjectId.isValid(req.params.SubjectId)) {
        return apiResponse.ErrorResponse(res, "Invalid Subject Id");
      }

      let updatedSubject = {
        title: req.body.title,
        VideoWebinars: req.body.VideoWebinars,
      };

      // update Subject
      SubjectModel.findByIdAndUpdate(
        req.params.SubjectId,
        updatedSubject,
        (err, updatedSubject) => {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          Logger.info(updatedSubject);

          Logger.info(" completed");

          return apiResponse.successResponseWithData(
            res,
            "Subject Updated Successfully.",
            updatedSubject
          );
        }
      );
    } catch (err) {
      console.error(" Error not completed", err);
      // throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Delete Subject Id By Id
 *
 * @returns {Object}
 */
exports.deleteSubjectById = [
  function (req, res) {
    Logger.info("deleteSubjectById in progress..");
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.SubjectId)) {
        return apiResponse.ErrorResponse(res, "Invalid Subject Id");
      }

      SubjectModel.findByIdAndDelete(req.params.SubjectId, (err) => {
        if (err) {
          return apiResponse.ErrorResponse(
            res,
            "Unable to delete the Subject."
          );
        }

        Logger.info("Subject Deleted Successfully");
        return apiResponse.successResponseWithData(
          res,
          "Subject Deleted Successfully.",
          {}
        );
      });
    } catch (err) {
      console.error("Subject not deleted. Error: ", err);
      // throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
