"use strict";
const Survivors = require('../models/survivors')
const Item = require('../models/Item')
const sequelize = require("./dbInstance");
const connectDB = async () => {
  try {
    await Survivors.sync()
    await Item.sync()
    // await Survivors.sync({force:true})
    // await Item.sync({force:true})
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB();
