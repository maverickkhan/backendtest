'use strict'
const router = require("express").Router();
const survivorsRouter = require("./survivors.routes");
const itemsRouter = require("./items.routes");
router.use(survivorsRouter);
router.use(itemsRouter);
module.exports = router;
