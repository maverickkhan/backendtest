"use strict";
const config = require("../config/config.json");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorsAliases: 0,
    dialectOptions: {
      options: {
        encrypt: false,
        enableArithAbort: true,
        logging: false,
        connectionTimeout: 300000,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      requestTimeout: 900000,
    },
  }
);
module.exports = sequelize;
