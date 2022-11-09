"use strict";
const sequelize = require("../db/dbInstance");
const { DataTypes, Model } = require("sequelize");
class Survivors extends Model {}
Survivors.init(
  {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    water: {
      type: DataTypes.INTEGER,
    },
    food: {
      type: DataTypes.INTEGER,
    },
    medication: {
      type: DataTypes.INTEGER,
    },
    ammunition: {
      type: DataTypes.INTEGER,
    },
    last_location: DataTypes.STRING,
    infected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Survivors",
    timestamps: false,
  }
);
module.exports = Survivors;
