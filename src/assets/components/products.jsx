import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ProductImage from '../images/template-product.png';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterTags from './filter-tags';

const Products = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        // Lógica para obtener los productos desde la API
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8090/product/listAll');
                const data = await response.json();
                setTotalProducts(data.length);

                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, [selectedCategories]);

    const isValidImageUrl = (url) => {
        // Expresión regular para verificar si la URL tiene una extensión de imagen válida
        const imageRegex = /\.(png|jpg|jpeg)$/i;
        return imageRegex.test(url);
    };

    const filteredProducts = selectedCategories && selectedCategories.length > 0
        ? products.filter(product => selectedCategories.includes(product.category_id))
        : products;



    const itemsPerPage = 6;
    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const totalItems = 18;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <Box sx={{ flexGrow: 1, margin: '1% 2%' }}>
            <FilterTags onSelectCategories={setSelectedCategories} />

            <Grid container spacing={2} justifyContent="center">
                {filteredProducts.slice(startIndex, endIndex).map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{
                            '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease',
                            },
                        }}>
                            <Link to="/">
                                <img
                                    src={isValidImageUrl(product.imagenes[0]) ? product.imagenes[0] : ProductImage}
                                    alt="Product Image"
                                    style={{
                                        display: 'block',
                                        margin: '2% auto',
                                        maxHeight: '150px',
                                        maxWidth: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '3%',
                                    }}
                                />
                            </Link>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.producto}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.nombreVendedor}  {product.apellidoVendedor}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {product.comentarios}
                                </Typography>
                                <Typography gutterBottom variant="h6" color="primary">
                                    ${product.precio}
                                </Typography>

                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button size="small" variant="outlined" startIcon={<FavoriteIcon />}>
                                        Guardar
                                    </Button>
                                    <Button size="small" variant="contained" startIcon={<ShoppingCartIcon />}>
                                        Comprar
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(totalProducts / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default Products;