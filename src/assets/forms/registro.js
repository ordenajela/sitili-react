import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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


const defaultTheme = createTheme();

function Registro() {
  const [userType, setUserType] = React.useState('cliente'); // Establece el valor inicial como 'cliente'
  
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      userType: userType,
    });
    
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
                  marginTop: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
  src="https://pbs.twimg.com/media/F9Y1kMVboAACobL?format=png&name=small"
  alt="Logo de la empresa"
  sx={{
    width: 150,
    height: 150,
    marginBottom: 2,
    
  }}
/>






                <Typography component="h1" variant="h5">
                  Crear Cuenta
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        name="password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
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
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
      
    </Box>
    
  );
}

export default Registro;
