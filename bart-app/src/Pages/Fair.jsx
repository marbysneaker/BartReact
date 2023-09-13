import React, {useState} from 'react'
import "./Fair.css"
import {fetchFairData} from '../bart'
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider, TextField} from '@mui/material';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';
import { Button } from '@mui/material';









const Fair = (props) => {

const [origin, setOrigin] = useState('12th');
const [destination, setDestination] = useState('16th');
const [fairPrice, setFairPrice] = useState('')
const {stations} = props;
const [count, setCount] = useState(1);

const newFair = async () => {
    const data = await fetchFairData(origin, destination);
    console.log(data);
    console.log("fare",data.root.fares.fare[0]["@amount"]);
    setFairPrice(data.root.fares.fare[0]["@amount"]);
    return data;
}

const handleCount = () => {
    setCount(count+1);
}

const theme = createTheme({
    palette: {
      primary: blue,
       secondary: {
        main: '#ffffff',
      },
      text: {
            primary: '#ffffff',
            secondary: '#000000',
            
        }
    }
  });

//   console.log("fair", newFair());
  console.log("origin", origin);
  return (
    <div className="fair">
        <h1>Fair calculator</h1>

        {Array.from({length:count}, (_,index) =>(
            <div className="fair-container" key={index}>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, minWidth: 120, color: palette.secondary }}>
                <InputLabel sx={{color: theme.palette.text.primary}} id="demo-simple-select-helper-label">Origin</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={origin}
                    label="Origin"
                    onChange={e=>setOrigin(e.target.value)}
                >
                    {stations.bartstations.map((station, index) => (
                    <MenuItem sx={{color: theme.palette.text.secondary}} key={index} value={station.name}>{station.full_name}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, minWidth: 120, color: palette.secondary }}>
                <InputLabel sx={{color: palette.primary}} id="demo-simple-select-helper-label">Destination </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={destination}
                    label="Destination"
                    onChange={e=>setDestination(e.target.value)}
                >
                    {stations.bartstations.map((station, index) => (
                    <MenuItem sx={{color: theme.palette.text.secondary}} key={index} value={station.name}>{station.full_name}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </ThemeProvider>
            <TextField  sx={{ m: 1, minWidth: 120,  color: palette.secondary }} id="standard-basic" value={fairPrice} label="Fair" />
            <Button sx={{ m: 1, minWidth: 120, height: 50, color: palette.secondary }} variant="contained" onClick={()=>newFair()}>Calculate</Button>
          </div>
        )
        )}
          <Button sx={{ m: 1, minWidth: 120, height: 50, color: palette.secondary }} variant="contained" onClick={()=>handleCount()}>Add</Button>
    </div>
  )
}

export default Fair