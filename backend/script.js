const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:5000')
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    axios.post('http://localhost:5000/delete')
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}, 2000);
