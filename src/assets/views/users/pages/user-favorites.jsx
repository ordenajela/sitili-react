import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ProductImage from '../../../images/template-product.png';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PrimarySearchAppBar from "../../../components/navbar2";
import StickyFooter from '../../../components/footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';

const UserFavoritos = ({ darkMode, setDarkMode, userData }) => {
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });
    const navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }));
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const tokenn = localStorage.getItem('token');
    console.log(tokenn);
    const fetchData = async () => {
        try {
            const token = tokenn;

            const response = await fetch('http://localhost:8090/favorite/list', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Otros encabezados si es necesario
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }

            const jsonData = await response.json();
            setData(jsonData);
            setTotalItems(jsonData.length);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const itemsPerPage = 8;
    const [page, setPage] = React.useState(1);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //const totalItems = 18;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //Validation type img
    const isValidImageUrl = (url) => {
        const imageRegex = /\.(png|jpg|jpeg)$/i;
        return imageRegex.test(url);
    };
    //Agregar canntidades de stock
    const [quantities, setQuantities] = useState({});

    const handleChange = (productId, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    const [showModalcar, setShowModalCar] = useState(false);
    const [alertTypecar, setAlertTypeCar] = useState('success');


    const [showdeletefav, setShowDeleteFav] = useState(false);
    const [alertTypefav, setAlertTypeFav] = useState('success');


    const carSaveClick = async (productId, stock) => {
        console.log("Produ " + productId);
        console.log("stock " + stock);
        try {
            // Verificar si rol y token no son nulos
            if (tokenn) {
                var data = {
                    id: productId,
                    stock: stock
                }
                console.log(data);
                const responsecar = await axios.post('http://localhost:8090/shoppingCar/create', data, {
                    headers: {
                        'Authorization': `Bearer ${tokenn}`
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
            if (error.response != null) {
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

    const carDeletefavClick = async (productiddel) => {
        try {
            // Verificar si token no son nulos
            if (tokenn) {
                const responsedeletefav = await axios.delete('http://localhost:8090/favorite/delete', {
                    headers: {
                        'Authorization': `Bearer ${tokenn}`
                    },
                    data: {
                        id: productiddel
                    }
                });
                if (responsedeletefav.status === 200) {
                    setShowDeleteFav(true);
                    setAlertTypeFav('success');
                    setTimeout(() => {
                        setShowDeleteFav(false);
                        fetchData();
                    }, 2000);
                }
            } else {
                console.log('Usuario no autenticado');
                navigate('/login')
            }
        } catch (error) {
            // Manejar el error si es necesario
            console.error('Error al guardar en Carrito de Compras:', error);
            setShowDeleteFav(true);
            setAlertTypeFav('error');
            setTimeout(() => {
                setShowDeleteFav(false);
            }, 2000);

        }
    };

    /*Show modal SHOPPINGCAR */
    const handleCloseModalCar = () => {
        setShowModalCar(false);
    };

    /*Show modal fav */
    const handleCloseModalFav = () => {
        setShowDeleteFav(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                flexGrow: 1,
                backgroundColor: darkMode ? '#1A2027' : '#fff',
            }}>

                <div>
                    <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>

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

                {/*MODAL de fav */}
                <Modal
                    open={showdeletefav}
                    onClose={handleCloseModalFav}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        {alertTypefav === 'success' && (
                            <Alert severity="success">
                                <AlertTitle>¡Éxito!</AlertTitle>
                                El producto se quitó de Favoritos
                            </Alert>
                        )}

                        {alertTypefav === 'error' && (
                            <Alert severity="info">
                                <AlertTitle>Ups</AlertTitle>
                                No se encontró el Producto
                            </Alert>
                        )}
                    </div>
                </Modal>

                {data.length === 0 ? ( // Verifica si no hay productos en la lista
                    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: darkMode ? '#1A2027' : '#fff' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px' }}>
                        Lista de favoritos
                    </Typography>
                    <Typography variant="h5" sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px' }}>
                        No hay productos aún
                    </Typography>
                </Box>
                ) : (
                    <Box sx={{ flexGrow: 1, margin: '3%' }}>
                        <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px', }}>
                            Lista de favoritos
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            {data.slice(startIndex, endIndex).map((product, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card sx={{
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}>
                                        <Link to="/">
                                            <img src={isValidImageUrl(product.imagenes[0]) ? product.imagenes[0] : ProductImage}
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
                                                }} />
                                        </Link>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {product.producto}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.vendedor}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {product.comentarios}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" color='primary'>
                                                {product.precio}
                                            </Typography>
                                            <div >
                                                <label htmlFor={`quantity-${product.fav_id}`}>Cantidad:</label>
                                                <TextField
                                                    id={`quantity-${product.fav_id}`}
                                                    type="number"
                                                    value={quantities[product.fav_id] || 1}
                                                    onChange={(e) => handleChange(product.fav_id, Math.max(1, Math.min(10, e.target.value)))}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 10,
                                                    }}
                                                    sx={{ width: '80px' }}
                                                />
                                            </div>
                                            <CardActions style={{ justifyContent: 'center' }}>
                                                <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => carDeletefavClick(product.fav_id)}>
                                                    Eliminar
                                                </Button>
                                                <Button size="small" variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => carSaveClick(product.fav_id, quantities[product.fav_id] || 1)}>
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
                                count={Math.ceil(totalItems / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                color="primary" />
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider >
    );
}
export default UserFavoritos;
