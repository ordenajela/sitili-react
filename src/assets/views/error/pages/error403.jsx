import React from 'react';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import logoImg from '../../../images/logo.png'
const Error403 = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
            marginLeft='10%'
            marginRight='10%'
        >
            <ImageList style={{display: 'flex', alignItems: 'center'}}>
                <ImageListItem>
                    <img src={logoImg} alt="Logo" style={{ maxWidth: '40%', margin: '0 auto', }} />
                </ImageListItem>
            </ImageList>
            <Typography variant="h1" color="error">
                403
            </Typography>
            <Typography variant="h4" color="textSecondary" gutterBottom>
                ¡Ups! Parece que te perdiste.
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                No tienes permisos para estas vistas brother :(
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                Ponte a Chambear mejor
            </Typography>
            <Button variant="contained" color="primary" href="/">
                Ir a la página de inicio
            </Button>
        </Box>
    );
};

export default Error403;
