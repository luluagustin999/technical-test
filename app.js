const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./app/api/auth/router");
const categoriesRouter = require("./app/api/categories/router");
const courseRouter = require("./app/api/course/router");
const userCourseRouter = require("./app/api/usercourse/router");
const adminRouter = require("./app/api/admin/router");
const URL = `/api/v1`;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to server" });
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, adminRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, courseRouter);
app.use(`${URL}`, userCourseRouter);


module.exports = app;
