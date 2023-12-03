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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import logoImage from '../../assets/images/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const defaultTheme = createTheme();

const style = {
  width: 400,
};
const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? '#1C2025' : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? '#F3F6F9' : '#434D5B'};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? '#B0B8C4' : '#6B7A90'};
  }
  `
);

function Registro() {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload();
  };
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const userTypeMap = {
    cliente: 4,
    vendedor: 3,
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [datosError, setDatosError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [errorType, setErrorType] = useState('');


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (password !== confirmPassword) {
      setErrorType('passwordMismatch');
      setPasswordError(true);
      setIsLoading(false);
      return;
    }
  
    setPasswordError(false);
    const postApiUrl = 'http://localhost:8090/registerNewUser';
  
    if (email === '' || password === '' || first_name === '' || last_name === '') {
      setErrorType('emptyFields');
      setDatosError(true);
      setIsLoading(false);
      return;
    }
  
    if (email.indexOf('@') === -1) {
      setErrorType('invalidEmail');
      setCorreoError(true);
      setIsLoading(false);
      return;
    }
  
    setDatosError(false);
    setCorreoError(false);
  
    const userData = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      role: userTypeMap[userType],
    };
  
    try {
      const postResponse = await axios.post(postApiUrl, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (postResponse.status === 200) {
        console.log('Usuario creado exitosamente');
        console.log(postResponse);
  
        const authToken = postResponse.data.token;
        localStorage.setItem('token', authToken);
  
        if (userType === 'cliente') {
          navigate('/user/home');
        } else if (userType === 'vendedor') {
          setShowAlert(true);
          setShowModal(true);
        }
      } else {
        setErrorType('requestError');
      }
    } catch (error) {
      setErrorType('requestError');
      console.log('Error en la solicitud:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Estás a un paso de ser vendedor de SITILI...
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Un administrador deberá aprobar tu solicitud para que puedas comenzar a vender.
          </Typography>
          <Button onClick={handleModalClose}>Cerrar</Button>
        </ModalContent>
      </Modal>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          Tu estado de vendedor está inactivo. Contacta al administrador.
        </Alert>
      </Snackbar>

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
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img src={logoImage} alt="Logo" style={{ borderRadius: '20%', maxWidth: '40%', margin: '0 auto', display: 'block' }} />

                  <Typography component="h1" variant="h5" style={{ padding: '5%', color: '#512D6D' }}>
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={correoError}
                          helperText={correoError ? 'Por favor, ingresa un correo electrónico válido.' : ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          name="first_name"
                          autoComplete="given-name"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Apellido"
                          name="last_name"
                          autoComplete="family-name"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Contraseña"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    {datosError && (
                      <Alert severity="error" onClose={() => setDatosError(false)}>
                        Por favor, completa todos los campos.
                      </Alert>
                    )}
                    {correoError && (
                      <Alert severity="error" onClose={() => setCorreoError(false)}>
                        Por favor, ingresa un correo electrónico válido.
                      </Alert>
                    )}
                    {passwordError && (
                      <Alert severity="error" onClose={() => setPasswordError(false)}>
                        Las contraseñas no coinciden. Por favor, verifica.
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2, backgroundColor: '#512D6D' }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Cargando...' : 'Crear Cuenta'}
                    </Button>
                    <Grid container sx={{ mb: 2 }}>
                    <Grid item xs>
                      <Link href="#" variant="body2" style={{ color: '#512D6D', textAlign: 'center' }}>
                        Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link to="/login" variant="body2" style={{ color: '#512D6D', textAlign: 'center' }}>
                        {"Iniciar Sesión"}
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
    </>
  );
}

export default Registro;
