import React from 'react'
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';
import { Button } from '@mui/material';
import './Dashboard.css';
export const Dashboard = (props) => {
  const {stations, currentStation, currentStationData, setCurrentStation, fetchSched} = props;
    //white
    const theme = createTheme({
      palette: {
        primary: blue,
      },
        secondary: {
          main: '#ffffff',
        },
    });

  const handleChange = (event) => {
      setCurrentStation(event.target.value);
    };

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
      <div className="train-header">
            <div>destination</div>
            <div className='time'>Time</div>
            <div className='direction'>Direction</div>
            
          </div>

        { currentStationData.root== undefined?<h1>Waiting for data</h1>
        
       
        : currentStationData.root.station[0].etd.map((train) => (
          <div className="train">
            <div className={train.destination}>{train.destination}</div>
            <div className='time'>{train.estimate[0].minutes}</div>
            <div className='direction'>{train.estimate[0].direction}</div>
            
          </div> ))
        }


      </div>

      
      

    </div>
  )
}
