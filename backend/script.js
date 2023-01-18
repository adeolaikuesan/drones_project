const axios = require("axios");

module.exports = callScript = () => {
  setInterval(() => {
    axios
      .get(`http://localhost:${process.env.PORT}`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(`http://localhost:${process.env.PORT}/delete`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 2000);
};
