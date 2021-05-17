let express = require( "express" );
const WebinarController = require( "../controllers/WebinarController" );

let router = express.Router();

router.post( "/upload", WebinarController.uploadWebinar );
router.get( "/search", WebinarController.searchWebinarByTitle );

module.exports = router;
