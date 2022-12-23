// In a separate router file, create a pilotRouter.js file where you will define the route for fetching the pilot information. This route should use the pilotController function to fetch the data and send the response back to the client.

const pilotController = require('../routes/pilotController');

router.get('/pilots/:serialNumber', pilotController.getPilotInfo);