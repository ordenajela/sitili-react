import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import logoImage from '../../assets/images/logo.png';
import axios from 'axios';

const defaultTheme = createTheme();

function Registro() {
  const [userType, setUserType] = useState('cliente');
  const userTypeMap = {
    cliente: 4,
    vendedor: 3,
  };

  const [passwordError, setPasswordError] = useState(false);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userTypeValue = userTypeMap[userType];

    if (data.get('password') !== data.get('confirmPassword')) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);

    const postApiUrl = 'http://localhost:8090/registerNewUser'; 
    
    try {
      const postResponse = await axios.post(postApiUrl, {
        email: data.get('email'),
        password: data.get('password'),
        role: userTypeValue,
      });

      if (postResponse.status === 200) {
        console.log('Usuario creado exitosamente');
        console.log(postResponse);

      } else {
        console.error('Error en la solicitud POST');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#512D6D',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          bgcolor: '#E3DDE8',
          width: '40%',
        }}
      >
        <CardContent>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Link to="/">
                  <img src={logoImage} alt="Logo" style={{ borderRadius: '50%', maxWidth: '40%', margin: '0 auto', display: 'block' }} />
                </Link>

                <Typography component="h1" variant="h5" style={{ padding: '5%' }}>
                  Crear Cuenta
                </Typography>

                <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="userTypeLabel">Tipo de Usuario</InputLabel>
                        <Select
                          labelId="userTypeLabel"
                          value={userType}
                          onChange={handleUserTypeChange}
                          inputProps={{
                            name: 'userType',
                            id: 'userType',
                          }}
                        >
                          <MenuItem value="cliente">Cliente</MenuItem>
                          <MenuItem value="vendedor">Vendedor</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        error={passwordError}
                        helperText={passwordError ? 'Las contraseñas no coinciden' : ''}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarse
                  </Button>
                  <Grid container sx={{ mb: 2 }}>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link to="/login" variant="body2">
                        {"Ya tienes cuenta? Inicia aquí"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Registro;
