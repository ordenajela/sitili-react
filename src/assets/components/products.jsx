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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Products = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const valor = localStorage.getItem('correo');
    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    console.log(valor);
    console.log(rol);
    console.log(token);
    useEffect(() => {
        // Lógica para obtener los productos desde la API
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://3.219.197.64:8090/product/listAll');
                const data = await response.json();
                setTotalProducts(data.length);
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, [selectedCategories]);


    //Validation type img
    const isValidImageUrl = (url) => {
        const imageRegex = /\.(png|jpg|jpeg)$/i;
        return imageRegex.test(url);
    };

    const [showModal, setShowModal] = useState(false);
    const [alertType, setAlertType] = useState('success');

    const [showModalcar, setShowModalCar] = useState(false);
    const [alertTypecar, setAlertTypeCar] = useState('success');

    const handleSaveClick = async (productId) => {
        try {
            // Verificar si rol y token no son nulos
            if (rol && token) {
                const response = await axios.post('http://3.219.197.64:8090/favorite/create', { id: productId }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setShowModal(true);
                    setAlertType('success');
                    setTimeout(() => {
                        setShowModal(false);
                    }, 3000);
                } else {
                    if (response.status === 400) {
                        setShowModal(true);
                        setAlertType('error');
                        setTimeout(() => {
                            setShowModal(false);
                        }, 3000);
                    }

                }
            } else {
                console.log('Usuario no autenticado');
                navigate('/login')

            }
        } catch (error) {
            // Manejar el error si es necesario
            if(error.response != null){
                if(error.response.data === "Producto repetido" && error.response.status === 400){
                    console.error('Error al guardar en favoritos:', error);
                    setShowModal(true);
                    setAlertType('error');
                    setTimeout(() => {
                        setShowModal(false);
                    }, 3000);
                }
               
            }
            
        }
    };

    const carSaveClick = async (productId, stock) => {
        console.log("Produ " + productId);
        console.log("stock " + stock);
        try {
            // Verificar si rol y token no son nulos
            if (rol && token) {
                var data = {
                    id: productId,
                    stock: stock
                }
                console.log("Carrito",data);
                const responsecar = await axios.post('http://3.219.197.64:8090/shoppingCar/create', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (responsecar.status === 200) {
                    setShowModalCar(true);
                    setAlertTypeCar('success');
                    setTimeout(() => {
                        setShowModalCar(false);
                    }, 3000);
                } else {
                    if (responsecar.status === 400) {
                        setShowModalCar(true);
                        setAlertTypeCar('error');
                        setTimeout(() => {
                            setShowModalCar(false);
                        }, 3000);
                    }

                }
            } else {
                console.log('Usuario no autenticado');
                navigate('/login')

            }
        } catch (error) {
            // Manejar el error si es necesario
            console.error('Error al guardar en Carrito de Compras:', error);
            if(error.response != null){
                if (error.response.data === "Cantidad excedente" && error.response.status === 400) {
                    setShowModalCar(true);
                    setAlertTypeCar('warning');
                    setTimeout(() => {
                        setShowModalCar(false);
                    }, 3000);
                } else if (error.response.data === "Prodcuto repetido" && error.response.status === 400) {
                    setShowModalCar(true);
                    setAlertTypeCar('error');
                    setTimeout(() => {
                        setShowModalCar(false);
                    }, 3000);
                }
            }

        }
    };
    //Agregar canntidades de stock
    const [quantities, setQuantities] = useState({});

    const handleChange = (productId, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };
    const filteredProducts = selectedCategories && selectedCategories.length > 0
        ? products.filter(product => selectedCategories.includes(product.category_id))
        : products;



    const itemsPerPage = 8;
    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const totalItems = 18;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    /*Show modal FAVORITES */
    const handleCloseModal = () => {
        setShowModal(false);
    };
    /*Show modal SHOPPINGCAR */
    const handleCloseModalCar = () => {
        setShowModalCar(false);
    };
    return (

        <Box sx={{ flexGrow: 1, margin: '1% 2%' }}>
            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    {alertType === 'success' && (
                        <Alert severity="success">
                            <AlertTitle>¡Éxito!</AlertTitle>
                            Se agregó un producto a Favoritos
                        </Alert>
                    )}

                    {alertType === 'error' && (
                        <Alert severity="info">
                            <AlertTitle>Ups</AlertTitle>
                            El producto ya se encuentra en Favoritos
                        </Alert>
                    )}
                </div>
            </Modal>

            {/*MODAL de shopping */}
            <Modal
                open={showModalcar}
                onClose={handleCloseModalCar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    {alertTypecar === 'success' && (
                        <Alert severity="success">
                            <AlertTitle>¡Éxito!</AlertTitle>
                            Se agregó un producto a Carrito de Compras
                        </Alert>
                    )}

                    {alertTypecar === 'error' && (
                        <Alert severity="info">
                            <AlertTitle>Ups</AlertTitle>
                            El producto ya se encuentra Carrito de Compras
                        </Alert>
                    )}

                    {alertTypecar === 'warning' && (
                        <Alert severity="warning">
                            <AlertTitle>Alerta</AlertTitle>
                            La cantidad excede el stock actual
                        </Alert>
                    )}
                </div>
            </Modal>
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
                                <Typography variant="body1" color="text.secondary">
                                    {product.comentarios}
                                </Typography>
                                <Typography gutterBottom variant="h6" color="primary">
                                    ${product.precio}
                                </Typography>
                                <div >
                                    <label htmlFor={`quantity-${product.product_id}`}>Cantidad:</label>
                                    <TextField
                                        id={`quantity-${product.product_id}`}
                                        type="number"
                                        value={quantities[product.product_id] || 1}
                                        onChange={(e) => handleChange(product.product_id, Math.max(1, Math.min(10, e.target.value)))}
                                        inputProps={{
                                            min: 1,
                                            max: 10,
                                        }}
                                    />
                                </div>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button size="small" variant="outlined" startIcon={<FavoriteIcon />} onClick={() => handleSaveClick(product.product_id)}>
                                        Guardar
                                    </Button>
                                    <Button size="small" variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => carSaveClick(product.product_id, quantities[product.product_id] || 1)}>
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