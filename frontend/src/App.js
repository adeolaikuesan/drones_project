import React from 'react';
import PilotTable from './components/PilotTable'
import Map from './components/Map'
import './App.css'

// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const App = () => {
  return (
    <div>
      <h1>No <span className= "red"> Drone</span> Zone</h1>
      <p>by Adeola Ikuesan</p>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={7}>
          <PilotTable />
        </Grid>
        <Grid xs={5}>
        <Map/>
        </Grid>
      </Grid>


    </div>
  )
}
export default App;