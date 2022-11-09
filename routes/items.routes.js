'use strict'
const router = require("express").Router();
const itemsController = require("../controllers/items.controller");
router.post("/tradeitem", itemsController.tradeItem);
module.exports = router;
