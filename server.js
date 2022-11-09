"use strict";
require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./db/connectDB");
const PORT = process.env.PORT;
const server = http.createServer(app);
const startServer = () => {
  try {
    server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
    connectDB;
  } catch (error) {
    console.log(error);
  }
};
startServer();
