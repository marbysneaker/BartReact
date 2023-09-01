import React, {useState} from 'react'
import "./Login.css"
import { Button, TextField } from '@mui/material';
import { UserAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {signIn, user} = UserAuth();
    const navig = useNavigate();
    const handleLogin = async () => {
        try
        {
            await signIn(username, password);
            setUsername('');
            setPassword('');
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
        <h1>Login</h1>
        <form className='login-form'>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=>setUsername(e.target.value)}/>
            <TextField id="outlined-basic" type='password' label="Password" variant="outlined" onChange={e=>setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </form>

      
    </div>
  )
}

export default Login
