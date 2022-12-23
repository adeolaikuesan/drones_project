const express = require('express')
const router = express.Router()
const dataController = require('../controllers/droneController');
const axios = require('axios');
// const Pilot = require('../models/pilotModel')

// GET All flying drones
// const getData = () => {
//     router.get('/data', dataController.getData);
//   };
  
// setInterval(getData, 2000);

router.get('/data', (req, res) => {
  axios.get('http://assignments.reaktor.com/birdnest/drones')
    .then(response => {
      dataController.handleDroneData(response, (droneData) => {
        res.send(droneData);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error.message });
    });
});

//   const getData = () => {
//     router.get('/data', (req, res) => {
//       dataController.getData(req, res, (violatingDrones) => {
//         const droneData = "JSON.parse(req.body.droneData);"
//         // const droneData = JSON.parse(req.body.droneData);
//         const serialNumbers = violatingDrones.map(drone => drone.serialNumber);
//         res.send({ droneData, violatingDrones, serialNumbers });
//       });
//     });
//   };
  
//   setInterval(getData, 2000);
  

// // GET Pilot
// router.get("/pilots/:serialNumber", async (req, res) => {
//     try {
//         const pilots = await Pilot.find()
//         if (pilots.length === 0) {
//             console.log("No found Pilots")
//             return res.status(204).json()
//         }
//         return res.json(pilots)
//     } catch (error) {
//         res.json(error)
//     }
// })

// // POST Add pilot to DB
// router.post("/pilots/:serialNumber", async (req, res) => {
//     const pilotFound = await Pilot.findOne({ url: req.body.url })
//     if (pilotFound) {
//         return res.status(301).json({ message: "The URL already exists" })
//     }

//     const pilot = new Pilot(req.body)
//     const savedPilot = await pilot.save()
//     res.json(savedPilot)
// })

// // DELETE Pilot from DB
// router.delete("/pilots/:serialNumber", async (req, res) => {
//     try {
//         const pilotDeleted = await Pilot.findByIdAndDelete(req.params.id)
//         if (!pilotDeleted) {
//             console.log("No Found Pilot")
//             return res.status(204).json()
//         }
//         console.log("Deleted Pilot")
//         return res.json(pilotDeleted)
//     } catch (error) {
//         res.json(error)
//     }
// })


// const serialNumbers = ['SN-NwWEWCwbil', 'SN-LH8q-QoKGO'];
// router.get('/data/pilots', dataController.getPilot(serialNumbers));

module.exports = router;