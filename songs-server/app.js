var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");

dotenv.config();

var songsRouter = require("./routes/songs");
var statsRouter = require("./routes/stats");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/songs", songsRouter);
app.use("/stats", statsRouter);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

module.exports = app;
