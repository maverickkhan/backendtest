'use strict'
const serviceInstance = require("../services/servivors.service");
exports.survivors = async (req, res) => {
  try {
    const data = await serviceInstance.register(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.getAllSurvivors = async (req, res) => {
    try {
      const data = await serviceInstance.getAllSurvivors();
      return res.status(200).json({data:data});
    } catch (error) {
      console.log(error);
    }
  };
exports.updateLocation = async (req, res) => {
  try {
    const data = await serviceInstance.updateLocation(req);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.containment = async (req, res) => {
    try {
      const data = await serviceInstance.containment(req);
      res.status(200).json({data:data});
    } catch (error) {
      console.log(error);
    }
  };