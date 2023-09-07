import React, {useState} from 'react'
import "./Login.css"
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container} from '@mui/material';
import { UserAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';




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
    <div className="signup">
    <Container component="main" maxWidth="xs">
    <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to={'/signup'} variant="body2">
                {"Dont have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            Sign In
          </Button>
         
        </Box>
      </Box>
    </Container>
    </div>
  )
}

export default Login
