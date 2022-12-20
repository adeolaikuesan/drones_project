const express = require('express')
const router = express.Router()
const { getDrones, getPilots } = require('../controllers/droneController')

router.get('/', getDrones => {
    res.status(200).json({jou: "Drones"})
})

router.get('/:serialNumber', getPilots => {
    res.status(200).json({jou: "Pilots"})
})


module.exports = router