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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const defaultTheme = createTheme();

function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [datosError, setDatosError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [errorType, setErrorType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    
    try {
      if (data.get('email') === '' || data.get('password') === '') {
        setErrorType('emptyFields');
        setDatosError(true);
        return;
      }

      if (data.get('email').indexOf('@') === -1) {
        setErrorType('invalidEmail');
        setCorreoError(true);
        return;
      }
      const response = await axios.post('http://3.219.197.64:8090/authenticate', {
        email: data.get('email'),
        password: data.get('password'),
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("rol", response.data.user.role[0].roleName)
        localStorage.setItem("correo", response.data.user.email);
        
        setLoginError(false);
        
        if (response.data.user.role[0].roleName === "Admin") {
          navigate('/dashboard/home');
        } else if (response.data.user.role[0].roleName === "User") {
          navigate('/user/home');
        } else if (response.data.user.role[0].roleName === "Seller") {
          if (response.data.user.status === true) {
            navigate('/seller/home');
          } else if (response.data.user.status === false) {
            setShowAlert(true);
          }
        } else if (response.data.user.role[0].roleName === "Root") {
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <>
    <Snackbar
      open={showAlert}
      autoHideDuration={3000}
      onClose={() => setShowAlert(false)}
    >
    <Alert severity="error" onClose={() => setShowAlert(false)} sx={{ borderRadius: '8px', border: '1px solid #DAE2ED', boxShadow: '0px 4px 12px rgba(0,0,0, 0.20)', padding: '1rem', color: '#434D5B', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, textAlign: 'start', position: 'relative' }}>
          {errorType === 'emptyFields' && 'Por favor, completa todos los campos.'}
          {errorType === 'invalidEmail' && 'Por favor, ingresa un correo electrónico válido.'}
          {errorType === 'requestError' && 'Error en la solicitud. Inténtalo de nuevo más tarde.'}
        </Alert>
    </Snackbar>

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
          bgcolor: '#FFFFFF',
          width: { xs: '90%', sm: '60%', md: '40%' },
          borderRadius: '10%',
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
                <img src={logoImage} alt="Logo" style={{ borderRadius: '20%', maxWidth: '40%', margin: '0 auto', display: 'block' }} />
                
                <Typography component="h1" variant="h5" style={{
                  color: '#512D6D',
                  paddingTop: '5%'}}>
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                  {datosError && (
                    <Typography variant="body2" color="error">
                      Por favor, completa todos los campos.
                    </Typography>
                  )}
                  {correoError && (
                    <Typography variant="body2" color="error">
                      Por favor, ingresa un correo electrónico válido.
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 3, color: '#FFFFF', backgroundColor: '#512D6D' }}
                  >
                    Ingresar
                  </Button>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} >
                      <Link to="/forgetPasswordSitili" variant="body2" style={{ textAlign: 'center' }} >
                        {"Olvidaste tu contraseña?"}
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Link to="/registro" variant="body2" style={{ textAlign: 'center' }} >
                        {"Regístrate aquí"}
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
    </>
  );
}

export default Login;
