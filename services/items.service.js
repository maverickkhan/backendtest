"use strict";
const Item = require("../models/item");
const Survivors = require("../models/survivors");
const items = {
  water: 4,
  food: 3,
  medication: 2,
  ammunition: 1,
};
class ItemService {
  constructor() {}
  tradeItem = async (req, res) => {
    try {
      const { id } = req.body;
      const result = await Survivors.findOne({ where: { id: id } });
      const { water, food, medication, ammunition } = req.body;
      const trade = new Item({
        water: water,
        food: food,
        medication: medication,
        ammunition: ammunition,
      });
      await trade.save();
      if (water * result.water >= 6) {
        await Survivors.update(water, { where: { id: id } });
        return { msg: "you are allowed to trade water" };
      }
      if (food * result.food >= 6) {
        await Survivors.update(food, { where: { id: id } });
        return { msg: "you are allowed to trade food" };
      }
      if (medication * result.medication >= 6) {
        await Survivors.update(medication, { where: { id: id } });
        return { msg: "you are allowed to trade medication" };
      }
      if (ammunition * result.ammunition >= 6) {
        await Survivors.update(ammunition, { where: { id: id } });
        return { msg: "you are allowed to trade ammunition" };
      } else {
        return { msg: "can not trade items" };
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new ItemService();
