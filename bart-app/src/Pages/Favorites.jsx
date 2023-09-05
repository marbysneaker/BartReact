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

      
    // const fetchSched = async () => {
    //   let allData = [];
  
    //   for (let station of favorites) {
    //     try {
    //       const data = await fetchStationData(station);
    //       let trainData = { name: data.root.station[0].name, trains: data.root.station[0].etd };
    //       allData.push(trainData);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   setStationData(allData);
    //   console.log("all data", allData);
    // };

    const fetchSched = async () => {
            if (!favorites || favorites.length === 0) return;
        
            try {
              const allData = await Promise.all(
                favorites.map(async (station) => {
                  const data = await fetchStationData(station);
                  if (data.root && data.root.station[0]) {
                    return {
                      name: data.root.station[0].name,
                      trains: data.root.station[0].etd,
                    };
                  }
                  return null;
                })
              );
        
              // Remove null values
              const filteredData = allData.filter(Boolean);
              setStationData(filteredData);
            } catch (error) {
              console.error(error);
            }
          };

    

      const getUser = async () => {
    try {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const favoritesData = docSnap.data().favorites;
        if (favoritesData) {
          setFavorites(favoritesData);
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


    // const getUser = async () => {
    //   try {
    //     const docRef = doc(db, "users", user.email);
    //     const docSnap = await getDoc(docRef);
    //     // ...rest of the code
    //     if (docSnap.exists()) {
    //       setFavorites(docSnap.data().favorites);
    //       console.log("Document data:", docSnap.data());
    //   } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //   }
    //   } catch (error) {
    //     console.error("An error occurred:", error);
    //   }
  
    // }

  

    useEffect(()=>{
        
        const fetchData = async () => {
          if (user && user.email) {
            await getUser();
            await fetchSched();
          }
          
        }

        fetchData();

    },[])

    // console.log("all stations", stationData);
    // console.log(bartstations)
    console.log("favorites",favorites);
    console.log("users", user);


  return (
    <div className='favorites'>
      <h1>Favorites</h1>
     {stationData.map((station)=>{

        return(
          <>
          
          <div className='favorites-station-name'>{station.name}</div>
          
          

          <div className="favorites-trains-container">
           
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
            </>
        )
      })}
        
    </div>
  )
}

export default Favorites








// const { user } = UserAuth();
//   const [favorites, setFavorites] = useState([]);
//   const [stationData, setStationData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user && user.email) {
//         await getUser();
//         await fetchSched();
//       }
//     };

//     fetchData();
//   }, []);

//   const getUser = async () => {
//     try {
//       const docRef = doc(db, 'users', user.email);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const favoritesData = docSnap.data().favorites;
//         if (favoritesData) {
//           setFavorites(favoritesData);
//         }
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   const fetchSched = async () => {
//     if (!favorites || favorites.length === 0) return;

//     try {
//       const allData = await Promise.all(
//         favorites.map(async (station) => {
//           const data = await fetchStationData(station);
//           if (data.root && data.root.station[0]) {
//             return {
//               name: data.root.station[0].name,
//               trains: data.root.station[0].etd,
//             };
//           }
//           return null;
//         })
//       );

//       // Remove null values
//       const filteredData = allData.filter(Boolean);
//       setStationData(filteredData);
//     } catch (error) {
//       console.error(error);
//     }
//   };