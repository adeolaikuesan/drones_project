const mongoose = require('mongoose')

// Define the Schema 

const pilotSchema =  mongoose.Schema(
  {
      pilotId: {
          type: String,
          unique: true,
      },
      firstName: {
          type: String,
      },
      lastName: {
          type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
  },
  { timestamps: { createdAt: "created_at" } }
)

module.exports = mongoose.model('Pilot', pilotSchema)

// const pilot = new Pilot({
//     pilotId: String
// })

// pilot.save().then(result => {
//   console.log('pilot saved!')
//   mongoose.connection.close()
// })


// Tää frontendiin 

// app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//       response.json(notes)
//     })
//   })