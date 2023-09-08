import React from 'react'
import {Box, colors, FormControl, InputLabel, MenuItem, Select, createTheme, ThemeProvider} from '@mui/material';
import { blue } from '@mui/material/colors';
import { palette } from '@mui/system';
import { Button } from '@mui/material';
import './Dashboard.css';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {doc, setDoc, addDoc, updateDoc, arrayUnion, connectFirestoreEmulator} from 'firebase/firestore';

export const Dashboard = (props) => {
  const {stations, currentStation, currentStationData, setCurrentStation, fetchSched} = props;
  const {user} = UserAuth();
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
    // console.log(stations);




  const addToFavorites = async () => {
    
    const userRef = doc(db, "users", user.email);
    console.log(userRef);
    try {
      await updateDoc(userRef, {
          favorites: arrayUnion(currentStation)
      });
  } catch (error) {
      console.error("Error adding to favorites:", error);
  } 
    // setDoc(userRef, {
    //   favorites: [...user.favorites, currentStation]
    // }, {merge: true})
  }
    



    console.log("current station", currentStation);
    // console.log("sample", currentStation[0].estimate[0]);


  return (
    <div className="Main-container">
      
      <h3>Select Station</h3>

      <div className="stations-container">
          <div className='dropdown'>
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
          </div>


          <Button variant="contained" onClick={fetchSched}>Submit</Button>

          
          {user? <Button variant="contained" onClick={addToFavorites}>Add to favorites</Button>:
          null}

      </div>

      <div className="schedule-container">
              <div className="train-header">
                    <div>Train</div>
                    <div className='time'>Time</div>
                    <div className='direction'>Direction</div>
                    
              </div>
              <div className="trains-container">
              

                { currentStationData.root== undefined || currentStationData.root.station[0].etd == undefined ?<h1 className='waiting'>Waiting for data</h1>
                
              
                : currentStationData.root.station[0].etd.map((train) => (
                  <div className={`train ${train.estimate[0].color}`} >
                    <div >{train.destination}</div>
                    <div className='time'>{train.estimate[0].minutes}</div>
                    <div className='direction'>{train.estimate[0].direction}</div>
                    
                  </div> ))
                }


              </div>
      </div>

      
      

    </div>
  )
}
