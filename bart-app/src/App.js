import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import fetcthStationData from './bart';
import bartstations from './bartstations';

function App() {
  const [stations, setStations] = useState({bartstations})





  console.log(stations);

  return (
    <div className="Main-container">
      <h1>Bart's React App</h1>
      <h3>Stations</h3>
      

    </div>
  );
}

export default App;
