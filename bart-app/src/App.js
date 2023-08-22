import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';


function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');

  const handleChange = (event) => {
    setCurrentStation(event.target.value);
  };


  const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      text: {
        primary: '#173A5E',
        secondary: '#46505A',
      },
      action: {
        active: '#001E3C',
      },
      success: {
        dark: '#009688',
      },
    },
  });

  console.log(stations);

  return (
    <div className="Main-container">
      <h1>Bart's React App</h1>
      <h3>Stations</h3>
      <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-label">Station</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentStation}
          label="Age"
          onChange={handleChange}
        >
          {bartstations.map((station) => {
            return <MenuItem value={station.name}>{station.full_name}</MenuItem>

          })}

          
        </Select>
      </FormControl>
    </Box>
    </ThemeProvider>
      

    </div>
  );
}

export default App;
