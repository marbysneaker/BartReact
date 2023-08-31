import React, { Children } from 'react'
import {Navigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Protectedroute = ({children}) => {
    const {user} = UserAuth();
    console.log("user in protected route",user);
    if(!user) {
        return <Navigate to='/' />

    }
    else{
        return children;
    }
}

export default Protectedroute