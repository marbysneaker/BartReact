import React from 'react'
import "./Login.css"
import { Button, TextField } from '@mui/material';

const Login = () => {
  return (
    <div className='login'>
        <h1>Login</h1>
        <form className='login-form'>
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Button variant="contained">Login</Button>
        </form>
        
      
    </div>
  )
}

export default Login
