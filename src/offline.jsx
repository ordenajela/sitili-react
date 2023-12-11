import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import logoImage from './logo.png';

const Offline = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
            textAlign="center"
            padding={4}
        >
            {/* <img src={logoImage} alt="Logo" style={{ width: 200, marginBottom: 16 }} /> */}

            <Typography variant="h4" color="error" gutterBottom>
                Sin conexión a internet
            </Typography>

            <Typography variant="body1" color="textSecondary" gutterBottom>
                Verifica tu conexión a internet e inténtalo de nuevo.
            </Typography>

            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary" href="/">
                        Ir a la página de inicio
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Offline;
