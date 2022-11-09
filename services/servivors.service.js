"use strict";
const Survivors = require("../models/survivors");
class survivorsService {
  constructor() {}
  register = async (req, res) => {
    try {
      const {
        name,
        age,
        gender,
        water,
        food,
        medication,
        ammunition,
        last_location,
      } = req;
      const result = new Survivors({
        name: name,
        age: age,
        gender: gender,
        water: water,
        food: food,
        medication: medication,
        ammunition: ammunition,
        last_location: last_location,
      });
      await result.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  getAllSurvivors = async (req, res) => {
    try {
      const result = await Survivors.findAll({});
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  updateLocation = async (req, res) => {
    try {
      const { id } = req.params;
      const { last_location } = req.body;
      await Survivors.update(
        { last_location },
        {
          where: { id: id },
        }
      );
      return { msg: "record updated successfully" };
    } catch (error) {
      console.log(error);
    }
  };
  containment = async (req, res) => {
    try {
      const { cr1, cr2, cr3 } = req.body;
      const { id } = req.params;
      if (cr1 == "yes" && cr2 == "yes" && cr3 == "yes") {
        await Survivors.update({ infected: true }, { where: { id: id } });
        return "that survivor is infected";
      } else {
        return { msg: "Not Infected" };
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new survivorsService();
