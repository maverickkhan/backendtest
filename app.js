"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index.routes");
const morgan = require("morgan");
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combine"));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", indexRoutes);
app.get("/", (req, res) => {
  res.send("ZSSN App");
});
module.exports = app;
