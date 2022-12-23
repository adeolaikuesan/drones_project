// exports.getPilot = (serialNumbers) => {
//   const data = [];
//   serialNumbers.forEach((serialNumber) => {
//     axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
//       .then((response) => {
//         data.push(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//   console.log(data)
//   return data;
// };


// exports.getPilot = (req, res, callback) => {g
//     axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
//     .then((response) => {
//       console.log(response.data);
//       res.send(response.data)
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   };

exports.getPilotInformation = (serialNumber) => {
    // logic for fetching pilot information goes here

    axios.get(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
  .then(response => {
    // access the pilot information from the response here
  })
  .catch(error => {
    // handle any errors here
  });

  };
  



// In a separate controller file, create a pilotController.js file where you will define the logic for fetching the pilot information from the API endpoint. You can use axios to make the HTTP request to the endpoint and store the response in a variable