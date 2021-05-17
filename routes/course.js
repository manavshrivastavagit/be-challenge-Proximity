let express = require( "express" );
const CourseController = require( "../controllers/CourseController" );

let router = express.Router();

router.post( "/", CourseController.createCourse );
router.get( "/:courseId", CourseController.courseInfoById );
router.put( "/:courseId", CourseController.updateCourseInfoById );
router.delete( "/:courseId", CourseController.deleteCourseById );

module.exports = router;
