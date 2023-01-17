import React, { useEffect, useState } from "react";
import PilotTable from "./components/PilotTable";
import Map from "./components/Map";
import "./App.css";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const App = () => {
  const [pilots, setPilots] = useState([]);
  const [violatingDrones, setViolatingDrones] = useState([]);

  const getData = async () => {
    try {
      // Get pilots who have violated the NDZ from DB
      axios
        .get(`http://localhost:5000/pilots`)
        .then((response) => {
          setPilots(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(getData, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(getData, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <h1>
        No <span className="red"> Drone</span> Zone
      </h1>
      <p>by Adeola Ikuesan</p>
      <p>
        This app displays a table of all pilots who have violated the NDZ
        perimeter within the last 10 minutes. Feel free to sort or filter rows
        :)
      </p>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <PilotTable data={pilots} />
        </Grid>
        {/* <Grid xs={5}>
        <Map data = {allDrones}/>
        </Grid> */}
      </Grid>
    </div>
  );
};
export default App;
