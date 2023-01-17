import React, {useEffect, useState }from 'react';
import { DataGrid } from '@mui/x-data-grid';
const moment = require('moment');

const DataGridForPilots = ({ data }) => {
  // console.log(data)
  // The columns of the table are: pilotId, firstName, lastName, phoneNumber, createdDt, email, serialNumber, distance, timeStamp

    const rows = data.map((row, index) => ({
        id : index,
        name: row.firstName + " "+  row.lastName,
        phoneNumber : row.phoneNumber,
        email : row.email,
        distance: Math.round(row.distance/ 1000),
        violationTime: moment(row.timeStamp).format("DD-MM-YYYY HH:mm:ss")
    }));

    const columns = [
        {field: "violationTime", headerName: "Time of violation",flex: 2 },
        {field: "distance", headerName: "Distance (m)",flex: 2 },
        {field: "name", headerName: "Name", flex: 2 },
        {field: "phoneNumber", headerName: "Phone number", flex: 2 },
        {field: "email", headerName: "Email", flex: 4},
    ];

    return (
        <div style={{ display: 'flex', height: '100%' , width: '100%' , minHeight: 600 }}>
          <DataGrid rows={rows} columns={columns} disableColumnSelector/>
        </div>
      );    
}

export default DataGridForPilots