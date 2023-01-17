const express = require("express");
const router = express.Router();
const droneController = require("../controllers/droneController");

// Allow Cors
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// GET all data
router.get("/", droneController.getAll);

// GET all pilots from DB
router.get("/pilots", droneController.getPilots);

// POST deletes all entries from DB where timeStamp is < 10 minutes
router.post("/delete", droneController.deletePilot);

module.exports = router;
