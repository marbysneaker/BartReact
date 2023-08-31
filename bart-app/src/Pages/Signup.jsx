import React, {useState} from 'react'
import "./Signup.css"
import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {createUser, user} = UserAuth();
    const navig = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try
        { await createUser(username, password);
            navig('/');
        }
        catch(error)
        {
            setError(error.message);
            console.log(error);
        }


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

export default Signup
