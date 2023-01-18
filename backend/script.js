// const axios = require("axios");
const droneController = require("../controllers/droneController");

module.exports = callScript = () => {
  setInterval(() => {
    droneController.getAll();
    droneController.deletePilot();
  }, 2000);

//   setInterval(() => {
//     axios
//       .get(`http://localhost:${process.env.PORT}`)
//       .then((response) => {
//         // console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .post(`http://localhost:${process.env.PORT}/delete`)
//       .then((response) => {
//         // console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, 2000);
};
