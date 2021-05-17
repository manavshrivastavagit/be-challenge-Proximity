let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.json({
    Title: "Proximity Backend Engineering Challenge",
    "swagger-api-docs": "http://localhost:4004/api-docs",
  });
});

// swagger-ui-express
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../open-api/swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
