import React, {useEffect, useState} from 'react'
import './Favorites.css'
import { UserAuth } from '../context/AuthContext'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import {bartstations} from '../bartstations'



const Favorites = () => {
    const {user} = UserAuth();
    const [favorites, setFavorites] = useState([]);



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
    },[])
    

  return (
    <div className='favorites'>
      <h1>Favorites</h1>
      {favorites.map((station) => {
        return(
            <div className='favorite'>
                {station}
            </div>
        )
      })}
        
    </div>
  )
}

export default Favorites
