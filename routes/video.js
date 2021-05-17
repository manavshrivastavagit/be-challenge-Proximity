let express = require( "express" );
const VideoController = require( "../controllers/VideoController" );

let router = express.Router();

router.post( "/upload", VideoController.uploadVideo );
router.get( "/search", VideoController.searchVideoByTitle );

module.exports = router;
