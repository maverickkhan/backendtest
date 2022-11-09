'use strict'
const router = require("express").Router();
const survivorsController = require("../controllers/survivors.controller");
router.post("/register", survivorsController.survivors);
router.get("/getallsurvivors", survivorsController.getAllSurvivors);
router.put("/updatelocation/:id", survivorsController.updateLocation);
router.put("/containment/:id", survivorsController.containment);
module.exports = router;
