# No Drone Zone 

As you might have already noticed, sometimes things do not go as you plan. I built my own version of the Reaktor pre-assignment task which can be found from https://frontend-production-d1d9.up.railway.app/ and its' code can be found from this repository. The app works locally on my own computer, but after spending a full day on debugging it in the railway.app CI/CD hosting environment I am using, I decided it's time to do other things as well.

The app is built using the PERN stack (PostgreSQL, Express, React, and Node.js) and is designed to list all pilots who 
have recently violated the NDZ (No Drone Zone) perimeter. Material-UI (MUI) is used for the data grid component and the application is containerized using Docker. The driving idea was to execute all the logic in the server side so that in client I only need to fetch the data from database.

Also, I wanted to take maximal use of the DB. I for example use a SQL query to delete all entries that have been in DB for 10 minutes instead of calculating the parameter's value.

Also, I wanted the UI to be customisable and therefore user can filter or sort rows and this way find the most relevant information for them. This way, the user could for example see who is the most recent pilot breaking the rules or who has been closest to the nest.

Features

* Persists pilot information for 10 minutes since their drone was last seen by the equipment
* Displays the closest confirmed distance to the nest
* Contains the pilot name, email address, and phone number
* Immediately shows the information from the last 10 minutes to anyone opening the application
* Does not require the user to manually refresh the view to see up-to-date information





