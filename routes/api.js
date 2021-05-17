let express = require("express");

let videoRouter = require("./video");
let webinarRouter = require("./webinar");
let courseRouter = require("./course");
let subjectRouter = require("./subject");

app = express();

app.use("/video/", videoRouter);
app.use("/webinar/", webinarRouter);
app.use("/course/", courseRouter);
app.use("/subject/", subjectRouter);

module.exports = app;
