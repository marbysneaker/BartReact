import React, { useEffect, useState } from "react";
import "./Favorites.css";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import bartstations from "../bartstations";
import {fetchStationData} from "../bart";
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { arrayRemove, updateDoc } from "firebase/firestore";

const Favorites = () => {
  const { user } = UserAuth();
  const [favorites, setFavorites] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(true);
  

  const fetchSched = async () => {
    if (!favorites || favorites.length === 0) return;

    try {
      const allData = await Promise.all(
        favorites.map(async (station) => {
          const data = await fetchStationData(station);
          if (data.root && data.root.station[0]) {
            return {
              name: data.root.station[0].name,
              abbr: data.root.station[0].abbr,
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
    if (!user || !user.email) {
      console.log("trigger4");
    }
    try {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      console.log("doc snap", docSnap);

      if (docSnap.exists()) {
        const favoritesData = docSnap.data().favorites;
        console.log("favorites data", favoritesData);
        if (favoritesData) {
          setFavorites(favoritesData, () => {
            fetchSched();

        }
          );
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  

 const removeStation = async (abbr) => {
   abbr = abbr.toLowerCase();

      
    console.log("remove station", abbr);

    
    const userRef = doc(db, "users", user.email);
    console.log(userRef);
    try {
      await updateDoc(userRef, {
        favorites: arrayRemove(abbr),
      });
      await getUser().then(() => {
        fetchSched();
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);

    }
    
 }

    
  useEffect(() => {
    const auth = getAuth(); // Get the authentication instance

    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoadingUser(false); // Set loadingUser to false once user data is determined
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.email) {
        console.log("User not found");
      }
      if (!loadingUser && user && user.email) {
        await getUser();

        await fetchSched();
      }
    };

    fetchData();
  }, [loadingUser, user]);

  // console.log("all stations", stationData);
  // console.log(bartstations)
  console.log("favorites", favorites);
  console.log("station data", stationData);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      fetchSched();
    }
  }, [favorites]);

  return (
    <div className="favorites">
      {loadingUser ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <div className="favorites-header">
            <h1>Favorites</h1>
          </div>
          <div className="favorites-stations-container">
            {stationData.map((station) => {
              return (
                <div className="favorites-station" key={station.name}>
                <React.Fragment key={station.name}>
                  <div className="favorites-station-name">{station.name}</div>

                  <div className="favorites-trains-container">
                    {/* Check if station.trains is defined and is an array before mapping */}
                    {Array.isArray(station.trains) &&
                      station.trains.map((train) => {
                        return (
                          <div className={`train ${train.estimate[0].color}`} key={train.destination}>
                            <div>{train.destination}</div>

                            {train.estimate && train.estimate[0] ? (
                              <>
                                <div className="time">
                                  {train.estimate[0].minutes}
                                </div>
                                <div className="direction">
                                  {train.estimate[0].direction}
                                </div>
                              </>
                            ) : (
                              <div className="nodata">No data</div>
                            )}
                          </div>
                        );
                      })}
                     
                  </div>
                </React.Fragment>
                <Button variant="contained" onClick={()=>removeStation(station.abbr)}>Remove</Button>
              </div>
           
              );
            })}
             
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
