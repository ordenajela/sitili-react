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

function Restore() {
  const [showAlert, setShowAlert] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorType, setErrorType] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordConfirm = async (event) => {
    event.preventDefault();

    if (token === '' || newPassword === '') {
      setShowAlert(true);
      setErrorType('void');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8090/api/resetPassword/confirm?token=' + token + '&newPassword=' + newPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.status === 200) {
        setShowAlert(true);
        setErrorType('success');
      } else if (response.status === 400) {
        setShowAlert(true);
        setErrorType('invalidToken');
      } else {
        setShowAlert(true);
        setErrorType('confirmError');
      }
    } catch (error) {
      setShowAlert(true);
      setErrorType('Entraste a Catch');
    } finally {
      setLoading(false);
      setToken('');
      setNewPassword('');
    }
  };

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        {errorType === 'success' ? (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {'Se ha realizado el cambio correctamente. Puede Iniciar Sesión con la nueva contraseña.'}
          </Alert>
        ) : (
          <Alert severity="error" onClose={() => setShowAlert(false)} sx={{ borderRadius: '8px', border: '1px solid #DAE2ED', boxShadow: '0px 4px 12px rgba(0,0,0, 0.20)', padding: '1rem', color: '#434D5B', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, textAlign: 'start', position: 'relative' }}>
            {errorType === 'invalidToken' && 'Token inválido o expirado.'}
            {errorType === 'void' && 'Todos Los Campos Son Obligatorios.'}
            {errorType === 'confirmError' && 'Error al confirmar la solicitud. Inténtalo de nuevo más tarde.'}
          </Alert>
        )}
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
                    paddingTop: '5%',
                  }}>
                    Confirmar Cambio de Contraseña
                  </Typography>
                  <Box component="form" onSubmit={handlePasswordConfirm} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="token"
                      label="Token"
                      name="token"
                      autoComplete="token"
                      autoFocus
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="newPassword"
                      label="Nueva Contraseña"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
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
                        <Link to="/login" variant="body2" style={{ textAlign: 'center' }} >
                          {"Iniciar Sesión"}
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

export default Restore;
