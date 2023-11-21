import React from 'react';
import { Container, Paper, Grid, Typography, Button, Box } from '@mui/material';
import PrimarySearchAppBar from "../../../components/navbar2";
import StickyFooter from "../../../components/footer";
import ProductImage from '../../../images/template-product.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {
    // Datos estáticos del producto
    const product = {
        name: 'Producto Ejemplo',
        description: 'Descripción detallada del producto. Esta es una descripción larga para ilustrar cómo se vería.',
        price: '$19.99',
        condition: 'Nuevo',
        stock: 20,
        shipping: 'Envío Gratis',
        imageUrl: ProductImage, // URL de una imagen de muestra
    };

    return (
        <>
            <div>
                <PrimarySearchAppBar />
            </div>
            <Container maxWidth="lg" style={{ paddingBottom: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                {product.price}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" paragraph>
                                Condición: {product.condition}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" paragraph>
                                Stock disponible: {product.stock}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" paragraph>
                                {product.shipping}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<ShoppingCartIcon />}
                                >
                                    Comprar
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<FavoriteIcon />}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <StickyFooter />
        </>
    );
};

export default ProductDetail;
