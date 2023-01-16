const express = require('express')
const router = express.Router()
const droneController = require('../controllers/droneController');
const axios = require('axios');
const client = require('../config/db');
const console = require('console');

const app = express();
const cors = require('cors')

// Allow Cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GET all data
router.get('/', droneController.getData);

// GET all pilots from DB
router.get('/pilots', droneController.getPilots)

// Maybe add a query to db?
router.post('/delete', droneController.deletePilot)

// Insert pilot to database
// router.get('/pilots/:serialNumber', droneController.createPilot)

router.post('/drones', droneController.createPilot)

module.exports = router;