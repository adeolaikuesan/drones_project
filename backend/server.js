const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const connectDB = require('./config/db')
const router = require('./routes/droneRoutes');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);
app.use('/data', router);


// Import the dataRouter and pilotRouter files into your server.js file and use the app.use() function to specify the routes for these routers.

app.listen(port, () => console.log(`Server started on port ${port}`))

connectDB()

