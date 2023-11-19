import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    try {
      const response = await axios.post('http://localhost:8090/authenticate', {
        email: data.get('email'),
        password: data.get('password'),
      });

      if (response.status === 200) {
        console.log("Peticion correcta");
        console.log(response.data.user.role[0].roleName);
        console.log("Los datos", response.data);
        console.log("El token:", response.data.jwtToken);

        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("rol", response.data.user.role[0].roleName)
        
        setLoginError(false);
        console.log(response);
        
        if (response.data.user.role[0].roleName === "Admin") {
          console.log("Eres admin");
          navigate('/dashboard/home');
        } else if (response.data.user.role[0].roleName === "User") {
          console.log("Eres User");
          navigate('/productos');
        } else if (response.data.user.role[0].roleName === "Vendedor") {
          console.log("Eres admin");
        } else if (response.data.user.role[0].roleName === "Root") {
          console.log("Eres admin");
        }
      } else {
        console.log(response.data);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      setLoginError(true);
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
        justifyContent: 'center'
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
                  marginTop: '2%',
                  marginBottom: '2%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Link to="/">
                  <img src={logoImage} alt="Logo" style={{ borderRadius: '50%', maxWidth: '40%', margin: '0 auto', display: 'block' }} />
                </Link>

                <Typography component="h1" variant="h5" style={{paddingTop: '5%'}}>
                  Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {loginError && (
                    <Typography variant="body2" color="error">
                      Correo o contraseña incorrectos, intenta de nuevo.
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Ingresar
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        {"Olvidaste tu contraseña?"}
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/registro" variant="body2">
                        {"No tienes cuenta? Regístrate aquí"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
