'use strict'
const itemServiceInstance = require("../services/items.service");
exports.tradeItem = async (req, res) => {
  try {
    const data = await itemServiceInstance.tradeItem(req);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};