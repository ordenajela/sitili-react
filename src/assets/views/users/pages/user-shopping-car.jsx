import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrimarySearchAppBar from '../../../components/navbar2';
import ProductImage from '../../../images/template-product.png';
import StickyFooter from '../../../components/footer';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';

const CartItem = ({ item, fetchData }) => {

    const [quantity, setQuantity] = React.useState(1);
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const tokenn = localStorage.getItem('token');

    const navigate = useNavigate();

    const isValidImageUrl = (url) => {
        const imageRegex = /\.(png|jpg|jpeg)$/i;
        return imageRegex.test(url);
    };


    const [quantities, setQuantities] = useState({});
    const handleChange = (productId, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    const [showModalcar, setShowModalCar] = useState(false);
    const [alertTypecar, setAlertTypeCar] = useState('success');

    const handleCloseModalCar = () => {
        setShowModalCar(false);
    };


    const carDeleteClick = async (productiddel) => {
        try {
            if (tokenn) {
                const responsedeletefav = await axios.delete('http://3.219.197.64:8090/shoppingCar/delete', {
                    headers: {
                        Authorization: `Bearer ${tokenn}`,
                    },
                    data: {
                        id: productiddel,
                    },
                });

                if (responsedeletefav.status === 200) {
                    setShowModalCar(true);
                    setAlertTypeCar('success');
                    setTimeout(() => {
                        setShowModalCar(false);
                        fetchData();

                    }, 2000);
                }
            } else {
                console.log('Usuario no autenticado');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al guardar en Carrito de Compras:', error);
            setShowModalCar(true);
            setAlertTypeCar('error');
            setTimeout(() => {
                setShowModalCar(false);
            }, 2000);
        }
    };
    return (
        <TableRow>
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
                            Se eliminó un producto de Carrito de Compras
                        </Alert>
                    )}

                    {alertTypecar === 'error' && (
                        <Alert severity="info">
                            <AlertTitle>Ups</AlertTitle>
                            El producto no se pudo eliminar de Carrito de Compras
                        </Alert>
                    )}

                    {alertTypecar === 'warning' && (
                        <Alert severity="warning">
                            <AlertTitle>Alerta</AlertTitle>
                            Producto No encontrado
                        </Alert>
                    )}
                </div>
            </Modal>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={isValidImageUrl(item.imagenes[0]) ? item.imagenes[0] : ProductImage}
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
                    <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                        {item.producto}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="right">
                <Typography variant="body2" >
                    ${item.precio}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <div>
                    <label htmlFor={`quantity-${item.car_id}`}>Cantidad:</label>
                    <TextField
                        id={`quantity-${item.car_id}`}
                        type="number"
                        value={quantities[item.car_id] || 1}
                        onChange={(e) => handleChange(item.car_id, Math.max(1, Math.min(10, e.target.value)))}
                        inputProps={{
                            min: 1,
                            max: 10,
                        }}
                    />
                </div>
            </TableCell>
            <TableCell align="right">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => carDeleteClick(item.car_id, quantities[item.car_id] || 1)}
                >
                    Quitar
                </Button>
            </TableCell>
        </TableRow>
    );
};

const ShopingCar = ({ darkMode, setDarkMode, userData }) => {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const tokenn = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = tokenn;
            const response = await fetch('http://3.219.197.64:8090/shoppingCar/list', {
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

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

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

    //ID PARA CONFIRMAR O CANCELAR COMPRA
    const [idsproducts, setIdsProducts] = useState([]);

    const handleLlenarIds = (data) => {
        const newIds = data.map(item => item.id);
        setIdsProducts(prevIds => [...prevIds, ...newIds]);
    };
    const handleLimpiarIds = () => {
        setIdsProducts([]);
    };
    const handleBuyNowClick = async () => {
        setShowCompraModal(true);
    };
    //     const compraData = [];
    //     //Construir objeto para datos de producto
    //     for (const item of data) {
    //         const compraItem = {
    //             description: item.producto,
    //             amount: item.precio * 100,
    //             currency: 'mxn',
    //             payment_method_types: 'card',
    //         };
    //         compraData.push(compraItem);
    //     }
    //     try {
    //         console.log(tokenn);
    //         if (tokenn) {
    //             const responsedeletefav = await axios.post(
    //                 'http://localhost:8090/stripe/paymentintent',
    //                 compraData,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${tokenn}`
    //                     }
    //                 }

    //             );
    //             if (responsedeletefav.status === 200) {
    //                 console.log(responsedeletefav);
    //                 //fetchData();
    //                 setShowCompraModal(true);
    //                 /*for (const itemids of responsedeletefav.data) {
    //                     console.log("OYEEEEEEEEE");
    //                     console.log(itemids);
    //                     idsproducts.push(itemids.id);
    //                 }*/
    //                 handleLlenarIds(responsedeletefav.data);

    //             }
    //         } else {
    //             console.log('Usuario no autenticado');
    //             //navigate('/login');
    //         }
    //     } catch (error) {
    //         console.error('Error al guardar en Carrito de Compras:', error);
    //     }


    //     console.log('Datos de la compra:', compraData);
    // };

    const [showCompraModal, setShowCompraModal] = useState(false);

    const handleCloseCompraModal = () => {
        setShowCompraModal(false);
    };

    // Alertas
    const [mostrarAlertaCompra, setMostrarAlertaCompra] = useState('');
    const [mostrarAlertaCompraCancel, setMostrarAlertaCompraCancel] = useState('');
    const [mostrarAlertaCompraError, setMostrarAlertaCompraError] = useState('');

    const handleFinalizarCompra = async () => {
        console.log(idsproducts);
        try {
            if (tokenn) {
                const responsedeletefav = await axios.get(
                    'http://3.219.197.64:8090/stripe/saleCar',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenn}`
                        }
                    }

                );
                if (responsedeletefav.status === 200) {
                    console.log(responsedeletefav);
                    //fetchData();
                    console.log('Compra finalizada');
                    setShowCompraModal(false);
                    handleLimpiarIds();
                    setMostrarAlertaCompra('success');
                    setTimeout(() => {
                        setMostrarAlertaCompra('none');
                    }, 3000);
                    setTimeout(() => {
                        fetchData();
                    }, 3000);
                }
            } else {
                console.log('Usuario no autenticado');
                //navigate('/login');
            }
        } catch (error) {
            console.error('Error al Confirmar Compra:', error);
            setMostrarAlertaCompraError('success');
            setTimeout(() => {
                setMostrarAlertaCompraError('none');
                console.log("Se intentó pero no jaló");
            }, 3000);
        }


    };

    const handleCancelarCompra = async () => {
        console.log(idsproducts);
        try {
            if (tokenn) {
                const responsedeletefav = await axios.post(
                    'http://3.219.197.64:8090/stripe/cancel',
                    idsproducts,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenn}`
                        }
                    }

                );
                if (responsedeletefav.status === 200) {
                    console.log(responsedeletefav);
                    //fetchData();
                    console.log('Compra Cancelada');
                    setShowCompraModal(false);
                    handleLimpiarIds();
                    setMostrarAlertaCompraCancel('error');
                    setTimeout(() => {
                        setMostrarAlertaCompraCancel('none');
                        console.log("Se intentó pero no jaló");
                    }, 3000);
                }
            } else {
                console.log('Usuario no autenticado');
                //navigate('/login');
            }
        } catch (error) {
            console.error('Error al Cancelar compra Compra:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {showCompraModal && (
                <Modal
                    open={showCompraModal}
                    onClose={handleCloseCompraModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ color: darkMode ? '#fff' : '#000' }}>
                            Compra en proceso
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleFinalizarCompra}>
                                Finalizar compra
                            </Button>
                            <Box sx={{ marginLeft: 1 }}>
                                <Button variant="contained" color="error" onClick={handleCancelarCompra}>
                                    Cancelar compra
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            )}
            <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
            {data.length === 0 ? ( // Verifica si no hay productos en el carrito
                <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: darkMode ? '#1A2027' : '#fff' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px' }}>
                        Carrito de Compras
                    </Typography>
                    <Typography variant="h5" sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px' }}>
                        No hay productos aún
                    </Typography>
                </Box>
            ) : (
                <div>
                    <Box sx={{
                        flexGrow: 1,
                        padding: 4,
                        backgroundColor: darkMode ? '#1A2027' : '#fff',
                    }}>
                        <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                            {mostrarAlertaCompra === 'success' && (
                                <Alert severity="success">
                                    <AlertTitle>¡Compra realizada!</AlertTitle>
                                    Se ha realizado la compra.
                                </Alert>
                            )}
                            {mostrarAlertaCompraCancel === 'error' && (
                                <Alert severity="error">
                                    <AlertTitle>¡Compra cancelada!</AlertTitle>
                                    Se ha cancelado la compra.
                                </Alert>
                            )}
                            {mostrarAlertaCompraError === 'success' && (
                                <Alert severity="error">
                                    <AlertTitle>¡Faltan datos personales!</AlertTitle>
                                    Completa tu perfil de usuario.
                                </Alert>
                            )}
                        </div>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#fff' : '#000', marginTop: '20px', }}>
                                    Carrito de Compras
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            {data.map((item) => (
                                                <CartItem key={item.car_id} item={item} fetchData={fetchData} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                    <Button variant="contained" color="primary" size="large" onClick={() => {
                                        handleBuyNowClick();
                                    }}>
                                        Comprar ahora
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            )}
        </ThemeProvider>
    );
};

export default ShopingCar;
