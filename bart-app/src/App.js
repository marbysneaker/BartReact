import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';
import { Button } from '@mui/material';


function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');
  const [currentStationData, setCurrentStationData] = useState({});

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
  
  const fetchSched = async () => {
    const data = await fetcthStationData(currentStation);
    console.log("data",data);
    setCurrentStationData(data);
    console.log("currentStationData",currentStationData.root.station[0].etd);
    console.log("where is my data")
    console.log(currentStation.length)
    // let station;
    // currentStationData.root.map((station) => {
    //   console.log("station",station);
    // })
  }


  console.log(stations);
  console.log(currentStation);

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
              <MenuItem value={station.name}>{station.full_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
      <Button variant="contained" onClick={fetchSched}>Submit</Button>

      <div className="trains-container">
        { currentStationData? 
        currentStationData.root.station[0].etd.map((train) => (
          <div className="train">
            <h3>{train.destination}</h3>
            <h4>{train.estimate[0].minutes}</h4>
          </div>
        ))
        : <h1>Waiting for data</h1>
        }


      </div>

      
      

    </div>
  );
}

export default App;
