import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';
import { blue } from '@mui/material/colors';


function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');

  const handleChange = (event) => {
    setCurrentStation(event.target.value);
  };

  


  console.log(stations);

  return (
    <div className="Main-container">
      <h1>Bart's React App</h1>
      <h3>Stations</h3>
      
    
      

    </div>
  );
}

export default App;
