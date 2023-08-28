import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';

import { Dashboard } from './Pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');
  const [currentStationData, setCurrentStationData] = useState({});

 

  
  const fetchSched = async () => {
    
    try {
    const data = await fetcthStationData(currentStation);
    console.log("data",data);
    setCurrentStationData(data);
    console.log("currentStationData",currentStationData.root.station[0].etd);
    console.log("where is my data")
    console.log(currentStation.length)
    } catch (error) {
      console.log(error);
    }
    // let station;
    // currentStationData.root.map((station) => {
    //   console.log("station",station);
    // })
  }


  console.log(stations);
  console.log(currentStation);
  console.log("current",currentStationData);
  console.log("current",currentStationData.root);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard stations={stations} currentStation={currentStation} setCurrentStation={setCurrentStation} setCurrentStationData={setCurrentStationData} currentStationData={currentStationData} fetchSched={fetchSched}/>}>
         
        
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
