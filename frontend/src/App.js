import React, {useEffect, useState }from 'react';
import PilotTable from './components/PilotTable'
import Map from './components/Map'
import './App.css'
import axios from 'axios'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const App = () => {

  const [pilots, setPilots] = useState([]);
  const [allDrones, setDrones] = useState([]);
  const [violatingDrones, setViolatingDrones] = useState([]);

  const getData = async () => {
    try {
      const [response1, response2] = await Promise.all([
          axios.get(`http://localhost:5000/pilots`),
          axios.get(`http://localhost:5000`),
      ]);

      // console.log(response1.data) // pilots
      // console.log(response2.data.violatingDrones) // violating drones
      // console.log(response2.data.droneData) // allDrones
      setPilots(response1.data)
      setDrones(response2.data.droneData)

      let violatingDrones = response2.data.violatingDrones
      console.log(violatingDrones.length);
      if (violatingDrones.length > 0) {
        console.log('ON')
        axios.post(`http://localhost:5000/drones`, {
          violatingDrones
        })
      }
      setTimeout(getData, 2000);
    } catch (error) {
        console.error(error);
    }
  }

  const deleteData = async () => {
    try {
      console.log("DELETE")
      axios.post(`http://localhost:5000/delete`)
      // setTimeout(deleteData, 2000);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    getData();
    deleteData();
  }, [])

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(getData, 2000);
    // timeoutId = setTimeout(deleteData, 2000);
    return () => clearTimeout(timeoutId);
  }, [])

  return (
    <div>
      <h1>No <span className= "red"> Drone</span> Zone</h1>
      <p>by Adeola Ikuesan</p>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs= {12}>
          <PilotTable data = {pilots} violating = {violatingDrones}/>
        </Grid>
        {/* <Grid xs={5}>
        <Map data = {allDrones}/>
        </Grid> */}
      </Grid>

    </div>
  )
}
export default App;