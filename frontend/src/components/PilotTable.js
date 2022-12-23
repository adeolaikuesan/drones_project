import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(closestDistance, timeStamp, pilotName, pilotEmail, phoneNumber) {
  return { closestDistance, timeStamp, pilotName, pilotEmail, phoneNumber };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

const PilotTable = () =>  {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Closest Distance</TableCell>
            <TableCell align="left">Time of Violation</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.timeStamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.closestDistance}
              </TableCell>
              <TableCell align="left">{row.timeStamp}</TableCell>
              <TableCell align="left">{row.pilotName}</TableCell>
              <TableCell align="left">{row.pilotEmail}</TableCell>
              <TableCell align="left">{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PilotTable