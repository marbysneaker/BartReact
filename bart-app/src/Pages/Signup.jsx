import React, {useState} from 'react'
import "./Signup.css"
import { Button, TextField } from '@mui/material';
import UserContext from '../context/AuthContext';
import { useContext } from 'react';
import { createUser } from '../context/AuthContext';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {createUserWithEmailAndPassword} = UserContext;

    const handleSignup = () => {
        createUser(username, password);
    }



    console.log(username);
    console.log(password);
    

  return (
    <div className='login'>
        <h1>Sign Up</h1>
        <form className='login-form'>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=>setUsername(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=>setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>

      
    </div>
  )
}

export default Login
