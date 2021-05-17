const CourseModel = require("../models/CourseModel");
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
 * Create a new course
 *
 * @returns {Object}
 */
exports.createCourse = [
  // Validate fields.
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("title must be specified."),

  // Sanitize fields.
  sanitizeBody("title").escape(),

  function (req, res) {
    validationResult(req).throw();

    courseModel = new CourseModel({
      title: req.body.title,
      subjects: req.body.subjects,
    });

    // save course info
    courseModel.save((err, course) => {
      if (err) {
        Logger.error(err);
        const errorMessage = "course not created";
        Logger.error("course not created. Error on save course");
        return apiResponse.ErrorResponse(res, errorMessage);
      }

      Logger.info("course created");

      return apiResponse.successResponseWithData(
        res,
        "course created successfully.",
        course
      );
    });
  },
];

/**
 * Get Course Info By Id
 *
 * @param {string} id
 *
 * @returns {Object}
 */
exports.courseInfoById = [
  function (req, res) {
    Logger.info("getting course info by courseId in progress..");
    if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      return apiResponse.ErrorResponse(res, "Invalid course Id");
    }
    try {
      // get courses info by courseId
      CourseModel.findById(req.params.courseId, (err, courseInfo) => {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }

        Logger.info("getting course info by courseId completed");
        return apiResponse.successResponseWithData(
          res,
          "course info By Id",
          courseInfo
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
 * update course Info By Id
 *
 * @returns {Object}
 */
exports.updateCourseInfoById = [
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

      if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
        return apiResponse.ErrorResponse(res, "Invalid course Id");
      }

      let updatedCourse = {
        title: req.body.title,
        subjects: req.body.subjects,
      };

      // update course
      CourseModel.findByIdAndUpdate(
        req.params.courseId,
        updatedCourse,
        (err, updatedCourse) => {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          Logger.info(updatedCourse);
          
          Logger.info(" completed");

          return apiResponse.successResponseWithData(
            res,
            "course Updated Successfully.",
            updatedCourse
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
 * Delete Course Id By Id
 *
 * @returns {Object}
 */
exports.deleteCourseById = [
  function (req, res) {
    Logger.info("deleteCourseById in progress..");
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
        return apiResponse.ErrorResponse(res, "Invalid course Id");
      }

      CourseModel.findByIdAndDelete(req.params.courseId, (err) => {
        if (err) {
          return apiResponse.ErrorResponse(res, "Unable to delete the course.");
        }

        Logger.info("Course Deleted Successfully");
        return apiResponse.successResponseWithData(
          res,
          "Course Deleted Successfully.",
          {}
        );
      });
    } catch (err) {
      console.error("Course not deleted. Error: ", err);
      // throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
