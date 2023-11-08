import React from 'react';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import logoImage from '../../images/logo.png';

const Error400 = () => {
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
            <ImageList style={{ display: 'flex', alignItems: 'center' }}>
                <ImageListItem>
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '40%', margin: '0 auto', }} />
                </ImageListItem>
            </ImageList>
            <Typography variant="h1" color="error">
                400
            </Typography>
            <Typography variant="h4" color="textSecondary" gutterBottom>
                ¡Ups! Algo salió mal.
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                Parece que la solicitud no pudo ser procesada.
            </Typography>
            <Button variant="contained" color="primary" href="/">
                Ir a la página de inicio
            </Button>
        </Box>
    );
};

export default Error400;
