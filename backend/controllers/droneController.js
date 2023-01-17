//For fetching information from backend

// import axios from 'axios';
const axios = require("axios");
const xml2js = require("xml2js");
const client = require("../config/db");

exports.getData = (req, res, callback) => {
  axios
    .get("http://assignments.reaktor.com/birdnest/drones")
    .then((response) => {
      xml2js.parseString(response.data, (err, result) => {
        const droneData = JSON.stringify(result);

        const timeStamp = result.report.capture.map(
          (i) => i.$.snapshotTimestamp
        );
        // console.log(timeStamp)
        const allDrones = result.report.capture.map((_) =>
          _.drone.map((x) => ({
            serialNumber: x.serialNumber,
            positionX: x.positionX,
            positionY: x.positionY,
          }))
        );
        // console.log(allDrones)

        allDrones.forEach((i) => getDistanceAndSerialNumber(i));

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
            result.push({ timeStamp, serialNumber, distance });
            // console.log(result)
          }
          // If drone is closer than 100 m from the origin
          const violatingDrones = result.filter((i) => i.distance < 100000);

          const response = {
            droneData: droneData,
            violatingDrones: violatingDrones,
          };
          res.send(response);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error.message });
    });
};

exports.getPilots = (req, res) => {
  // Get all columns from Pilot Table
  // The columns of the table are: pilotId, firstName, lastName, phoneNumber, createdDt, email, serialNumber, distance and timeStamp

  client.query('SELECT * FROM public."Pilots"', (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("Error occured");
    } else {
      res.status(200).send(result.rows);
    }
  });
};

// Hae data APIsta, jos on violating drones, lisää tietokantaan.
exports.getAll = (req, res) => {
  axios
    .get("http://assignments.reaktor.com/birdnest/drones")
    .then((response) => {
      xml2js.parseString(response.data, (err, result) => {
        // const droneData = JSON.stringify(result);

        const timeStamp = result.report.capture.map(
          (i) => i.$.snapshotTimestamp
        );
        // console.log(timeStamp)
        const allDrones = result.report.capture.map((_) =>
          _.drone.map((x) => ({
            serialNumber: x.serialNumber,
            positionX: x.positionX,
            positionY: x.positionY,
          }))
        );
        // console.log(allDrones)

        allDrones.forEach((i) => getDistanceAndSerialNumber(i));

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

            // Add the timeStamp, serialNumber and distance to the result array
            result.push({ timeStamp, serialNumber, distance });
            // console.log(result)
          }
          // Filter violating drones (closer than 100m from equipment)
          const violatingDrones = result.filter((i) => i.distance < 100000);
          if (violatingDrones.length > 0) {
            // console.log("Send violating drones");
          }
          exports.createPilot(violatingDrones, res);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error.message });
    });
};

exports.createPilot = async (violatingDrones, res) => {
  try {
    // const violatingDrones = req.body.violatingDrones;
    for (let i = 0; i < violatingDrones.length; i++) {
      const { serialNumber, distance, timeStamp } = violatingDrones[i];

      const response = await axios.get(
        `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
      );
      const { pilotId, firstName, lastName, phoneNumber, createdDt, email } =
        response.data;

      await client.query(
        `INSERT INTO public."Pilots" ("serialNumber", "pilotId", "firstName", "lastName", "phoneNumber", "createdDt", "email", "timeStamp", "distance") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          serialNumber,
          pilotId,
          firstName,
          lastName,
          phoneNumber,
          createdDt,
          email,
          timeStamp,
          distance,
        ]
      );
    }
    res.status(201).send({ message: "Data inserted successfully" });
  } catch (error) {
    if (error.code === "23505") {
      // This error message indicates that serialNumber number exists already (unique violation) so let's not throw an error.
      // console.log('SerialNumber already exists')
      // res.status(409).send({ message: 'SerialNumber already exists' });
    } else {
      res.status(500).send({ message: 'Error inserting data', error });
    }
  }
};

exports.deletePilot = (req, res) => {
  // If ten minutes has passed, delete row from database
  client.query(
    `DELETE FROM public."Pilots" WHERE "timeStamp" < (now() - interval '10 minutes')`,
    (err, results) => {
      if (err) {
        console.error(err);
      }
      res.status(200).send(results);
    }
  );
};
