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

      
  const fetchSched = async (currentStation) => {
    
    try {
    const data = await fetchStationData(currentStation);
    console.log("data",data);
    // addStation(data);
    
    // console.log("currentStationData",currentStationData.root.station[0].etd);
    console.log("where is my data")
    
    } catch (error) {
      console.log(error);
    }
    // let station;
    // currentStationData.root.map((station) => {
    //   console.log("station",station);
    // })
  }

  const addStation = (data) => {
    setStationData([...stationData, 
      {
        name: data.root.station[0].name,
        etd: data.root.station[0].etd
      
      }
      ]);
      console.log("stationData",stationData);
      
  }

    useEffect(()=>{
        const getUser = async () => {
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFavorites(docSnap.data().favorites);
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getUser();
        favorites.map((station) => {
          console.log("station",station);
          fetchSched(station);
        })
        console.log("bartstations");
        bartstations.map((station) => {
          favorites.map((fav) => {
            if(station.name == fav)
            {
              console.log("full name",station.full_name);
            }
          })
        })

    },[])

    console.log("all stations", stationData);
    console.log(bartstations)
    console.log("favorites",favorites);


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
