let express = require( "express" );
const SubjectController = require( "../controllers/SubjectController" );

let router = express.Router();

router.post( "/", SubjectController.createSubject );
router.get( "/:SubjectId", SubjectController.SubjectInfoById );
router.put( "/:SubjectId", SubjectController.updateSubjectInfoById );
router.delete( "/:SubjectId", SubjectController.deleteSubjectById );

module.exports = router;
