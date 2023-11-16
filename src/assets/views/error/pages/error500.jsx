import React from 'react';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import logoImage from '../../../images/logo.png';

const Error500 = () => {
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
                500
            </Typography>
            <Typography variant="h4" color="textSecondary" gutterBottom>
                Algo inesperado ha sucedido.
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                Nuestro servidor encontró un problema interno.
            </Typography>
            <Button variant="contained" color="primary" href="/">
                Ir a la página de inicio
            </Button>
        </Box>
    );
};

export default Error500;
