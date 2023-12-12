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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress'; 

const defaultTheme = createTheme();

function Forget() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [datosError, setDatosError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [errorType, setErrorType] = useState('');

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      const response = await fetch('http://localhost:8090/api/resetPassword/request?email=' + email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 400) {
        setDatosError(true);
        setCorreoError(false);
        setLoginError(false);
      } else if (response.status === 200) {
        setShowAlert(true);
        setErrorType('success');
      }
    } catch (error) {
      setShowAlert(true);
      setErrorType('success');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };
  
  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="success" onClose={() => setShowAlert(false)} sx={{ borderRadius: '8px', border: '1px solid #DAE2ED', boxShadow: '0px 4px 12px rgba(0,0,0, 0.20)', padding: '1rem', color: '#434D5B', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, textAlign: 'start', position: 'relative' }}>
          {errorType === 'success' && 'Solicitud de restablecimiento de contraseña exitosa. Revise su correo electrónico.'}
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
                    Recuperar Contraseña
                  </Typography>
                  <Box component="form" onSubmit={handleForgetPassword} noValidate sx={{ mt: 1 }}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                    </Button>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} md={6} >
                        <Link to="/restore" variant="body2" style={{ textAlign: 'center' }} >
                          {"Cambiar Contraseña"}
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
        <br></br>
      </Box>
    </>
  );
}

export default Forget;
