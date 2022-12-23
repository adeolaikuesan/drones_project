//For fetching information from backend

// import axios from 'axios';
const axios = require('axios');
const xml2js = require('xml2js');
const Pilot = require('../models/pilotModel')


exports.getData = (req, res, callback) => {
    axios.get('http://assignments.reaktor.com/birdnest/drones')
    .then(response => {
      xml2js.parseString(response.data, (err, result) => {
        const droneData = JSON.stringify(result);

        const timeStamp = result.report.capture.map(i => i.$.snapshotTimestamp)
        // console.log(timeStamp)
        const allDrones = result.report.capture.map(_ => _.drone.map( x => ({serialNumber: x.serialNumber, positionX: x.positionX, positionY: x.positionY})))
        // console.log(allDrones)

        allDrones.forEach(i => getDistanceAndSerialNumber(i));

        function getDistanceAndSerialNumber(obj) {
          // Create an empty result array
          const result = [];
          
          // Loop through each object in the input array
          for (const item of obj) {
            // Extract the serial number and position coordinates
            const serialNumber = item.serialNumber[0];
            const positionX = parseFloat(item.positionX[0]);
            const positionY = parseFloat(item.positionY[0]);
        
            // Calculate the distance between the given point and (250000, 250000)
            const distance = Math.sqrt(
              Math.pow(250000 - positionX, 2) + Math.pow(250000 - positionY, 2)
            );
        
            // Add the time stamp, serial number and distance to the result array
            result.push({timeStamp, serialNumber, distance });
            // console.log(result)
          }
      
          // If drone is closer than 100 m from the origin
          const violatingDrones = result.filter(i => i.distance < 100000)
          // console.log(violatingDrones)
          callback(violatingDrones);
          res.send({droneData : droneData , violatingDrones : violatingDrones})
        }
       })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error.message });
    });
};