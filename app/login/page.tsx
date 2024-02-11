'use client'; 

import { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FormEvent } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'http://localhost:3000';

  useEffect(()=>{
    localStorage.removeItem('user');
  },[])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      localStorage.removeItem('user');
      const response = await axios.post(`${apiUrl}/auth/signin`, { email, password });
      if(response.data.message){
        localStorage.setItem('user', response.data.jwt);
        window.location.href = '/question';
      }else{
        alert(response.data.jwt);
      }
      // handle login success
    } catch (error) {
        alert(error);
      // handle login error
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        
      <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom style={{textAlign:'center'}}>
                    Login
                </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{
                backgroundColor: 'blue',
              }}
          >
            Login
          </Button>
          <p style={{textAlign:'center'}}>OR</p>
          <Button  style={{
                backgroundColor: 'blue',
              }}
              fullWidth
            size="large"
              variant='contained' color='primary' onClick={()=>{window.location.href = '/signup';}}>Create a new Account</Button>
        </form>
      </Container>
      
    </Grid>
  );
};

export default Login;
