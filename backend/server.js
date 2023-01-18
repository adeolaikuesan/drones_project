

require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 5000
const router = require('./routes/droneRoutes');
const callScript = require('./script');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => console.log(`Server started on port ${port}`))

callScript();

