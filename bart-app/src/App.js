import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';


function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');

  const handleChange = (event) => {
    setCurrentStation(event.target.value);
  };
  //white
  const theme = createTheme({
    palette: {
      primary: blue,
    },
      secondary: {
        main: '#ffffff',
      },
  });
  


  console.log(stations);

  return (
    <div className="Main-container">
      <h1>Bart's React App</h1>
      <h3>Stations</h3>
      
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 1, minWidth: 120, color: palette.secondary }}>
          <InputLabel sx={{color: palette.primary}} id="demo-simple-select-helper-label">Stations</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={currentStation}
            label="Stations"
            onChange={handleChange}
          >
            {stations.bartstations.map((station) => (
              <MenuItem sx={{color: palette.primary}} value={station.name}>{station.full_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
      
      

    </div>
  );
}

export default App;
