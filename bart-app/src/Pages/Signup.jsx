import React, {useState} from 'react'
import "./Signup.css"
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container} from '@mui/material';
import { useContext } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
    <div className="signup">
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e=>setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign UP
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to={'/login'} variant="body2">
                {"Have an account already? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
    
  )
}

export default Signup




{/* <div className='login'>
        <h1>Sign Up</h1>
        <form className='login-form'>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=>setUsername(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=>setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>

      
    </div> */}