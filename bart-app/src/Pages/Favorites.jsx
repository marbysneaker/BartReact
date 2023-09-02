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
      const allData = []
      let station;
      for(station in favorites) {
        console.log("station",station);
        try {
          const data = await fetchStationData(favorites[station]);
          console.log("data",data);
          allData.push(data);
          // setCurrentStationData(data);
          // console.log("currentStationData",currentStationData.root.station[0].etd);
          console.log("where is my data")
          // console.log(currentStation.length)
          } catch (error) {
            console.log(error);
          }
      }
      setStationData(allData);
      console.log("allData",allData);

      // try {
      //   const docRef = doc(db, "users", user.email);
      //   const docSnap = await getDoc(docRef);
      //   // ...rest of the code
      //   if (docSnap.exists()) {
      //     setFavorites(docSnap.data().favorites);
      //     console.log("Document data:", docSnap.data());
      // } else {
      //     // doc.data() will be undefined in this case
      //     console.log("No such document!");
      // }
      // } catch (error) {
      //   console.error("An error occurred:", error);
      // }
  
    }

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
     {favorites.map((station) => {
        return <div>{station}</div>

     }
      )}
        
    </div>
  )
}

export default Favorites
