import React, {useEffect, useState} from 'react'
import './Favorites.css'
import { UserAuth } from '../context/AuthContext'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import bartstations from '../bartstations'
import fetchStationData from '../bart'



const Favorites = () => {
    const {user} = UserAuth();
    const [favorites, setFavorites] = useState([]);
    const [stationData, setStationData] = useState([]);

      
    const fetchSched = async () => {
      let allData = [];
  
      for (let station of favorites) {
        try {
          const data = await fetchStationData(station);
          let trainData = { name: data.root.station[0].name, trains: data.root.station[0].etd };
          allData.push(trainData);
        } catch (error) {
          console.error(error);
        }
      }
      setStationData(allData);
      console.log("all data", allData);
    };




    const getUser = async () => {
      try {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        // ...rest of the code
        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites);
          console.log("Document data:", docSnap.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      } catch (error) {
        console.error("An error occurred:", error);
      }
  
    }

  

    useEffect(()=>{
        
        const fetchData = async () => {
          await getUser();
          await fetchSched();
        }

        fetchData();

    },[])

    // console.log("all stations", stationData);
    // console.log(bartstations)
    // console.log("favorites",favorites);


  return (
    <div className='favorites'>
      <h1>Favorites</h1>
     {stationData.map((station)=>{

        return(
          <div className="favorites-trains-container">
            <div className="favorites-train-header">
                <div className='favorites-station-name'>{station.name}</div>
                
              </div>
              {station.trains.map((train)=>{
                return(
                  <div className="train">
                    <div>{train.destination}</div>
                    <div className='time'>{train.estimate[0].minutes}</div>
                    <div className='direction'>{train.estimate[0].direction}</div>
                    
                  </div>
                )
              })}
            </div>
        )
      })}
        
    </div>
  )
}

export default Favorites
