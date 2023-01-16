
require('dotenv').config()
const express = require('express')
// const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const router = require('./routes/droneRoutes');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', router);
app.use('/', router);


app.listen(port, () => console.log(`Server started on port ${port}`))


