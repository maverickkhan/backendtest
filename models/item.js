'use strict';
const sequelize = require('../db/dbInstance.js')
const { Model,DataTypes} = require('sequelize');

  class Item extends Model {}
  Item.init({
    water: DataTypes.INTEGER,
    food: DataTypes.INTEGER,
    medication: DataTypes.INTEGER,
    ammunition: DataTypes.INTEGER
  }, {
    sequelize:sequelize,
    modelName: 'Item',
    timestamps:false
  });
  module.exports = Item;