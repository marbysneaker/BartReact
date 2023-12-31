import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import {fetchStationData} from './bart';
import bartstations from './bartstations';

import { Dashboard } from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Layout  from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Protectedroute from './pages/ProtectedRoute';
import Favorites from './pages/Favorites';
import { AuthContextProvider } from './context/AuthContext';
import Fair from './pages/Fair';
function App() {
  const [stations, setStations] = useState({bartstations})
  const [currentStation, setCurrentStation] = useState('12th');
  const [currentStationData, setCurrentStationData] = useState({});

 

  
  const fetchSched = async () => {
    
    
    try {
    const data = await fetchStationData(currentStation);
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

    
    <AuthContextProvider>
      
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Dashboard stations={stations} currentStation={currentStation} setCurrentStation={setCurrentStation} setCurrentStationData={setCurrentStationData} currentStationData={currentStationData} fetchSched={fetchSched}/>}/>

          <Route path='faircalculator' element={<Fair stations={stations} />}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='favorites' element={<Protectedroute><Favorites/></Protectedroute>}/>
          
        
        </Route>
      </Routes>
    </AuthContextProvider>
    
  );
}

export default App;
