import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import 'aos/dist/aos.css';

import axios from "axios";
import { message } from "antd"; // Import message from antd
import { useNavigate } from "react-router-dom";

function LoginDesign() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define handleInputChange and handleSubmit functions
  const handleInputChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    setLoading(true);

    axios
      .post("http://localhost:8005/users/g", data)
      .then((response) => {
        setLoading(false);

        if (response.status === 200) {
          console.log("User logged in successfully");
          message.success("loggin successful");
          navigate("/home");
        } else {
          console.error("login failed with status:", response.status);
          message.error("login failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during registration:", error);
        message.error("Error during registration");
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(https://content.pymnts.com/wp-content/uploads/2021/05/General-Mills-Tyson-pet-treats-1-768x461.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100%',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red' }} />
          <Typography component="h1" variant="h5">
            Sign in with Care Master
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SignUp" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginDesign;