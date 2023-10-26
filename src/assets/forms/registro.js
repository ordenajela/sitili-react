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

const defaultTheme = createTheme();

function Registro() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      nombre: data.get('nombre'),
      apellido: data.get('apellido'),
      telefono: data.get('telefono'),
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
        }}
      >
        <CardContent>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                    src="/images/logo.png"
                    alt="Logo de la empresa"
                    sx={{
                        width: 100,
                        height: 100, // Ajusta el tamaño según tus necesidades
                        marginBottom: 2, // Espacio entre la imagen y el título
                    }}
                />
                

                <Typography component="h1" variant="h5">
                  Crear Cuenta
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
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    autoComplete="given-name"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    name="apellido"
                    autoComplete="family-name"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="telefono"
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarse
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
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
