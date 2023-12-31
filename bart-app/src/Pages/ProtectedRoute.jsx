import React, { Children } from 'react'
import {Navigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Protectedroute = ({children}) => {
    const {user} = UserAuth();
   
    if(!user) {
        return <Navigate to='/signup' />

    }
    else{
        return children;
    }
}

export default Protectedroute