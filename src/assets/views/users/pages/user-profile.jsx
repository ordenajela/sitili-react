import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Divider, Grid, Typography, Modal, TextField, Alert, AlertTitle } from "@mui/material";
import PrimarySearchAppBar from "../../../components/navbar2";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import StickyFooter from "../../../components/footer";
import ProductImage from "../../../images/template-product.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

// Datos estáticos

const compras = [
    {
        name: 'Play Station 5 Marvels Spiderman Edition',
        price: '$19.99',
        imageUrl: ProductImage,
        cantidad: '1'
    },
    {
        name: 'Play Station 5 Marvels Spiderman Edition',
        price: '$19.99',
        imageUrl: ProductImage,
        cantidad: '1'
    },
];


const UserProfile = ({ darkMode, setDarkMode }) => {
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    // Inicio - Ver y Editar datos personales 
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const tokenn = localStorage.getItem('token');

    // Get Datos del usuario
    const fetchDataUsuario = async () => {
        try {
            const response = await fetch('http://3.219.197.64:8090/dataUser/listu',
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`,

                    },
                });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching DataUser:', error);
        }
    };

    // Manipular los modals de la vista
    useEffect(() => {
        fetchDataUsuario();
        fetchDataDirections();
        fetchDataCC();
        fetchDataHistorial();
    }, []);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Crear variables para editarlas 
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);

    // Alertas
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

    const handleClic = async () => {
        // Accedemos a los valores de los campos de texto utilizando las referencias
        const firstNameLabel = firstNameRef.current.value;
        const lastNameLabel = lastNameRef.current.value;
        const phoneLabel = phoneRef.current.value;

        // Lógica para el PUT

        var objDataUser = {
            firstName: firstNameLabel,
            lastName: lastNameLabel,
            phone: phoneLabel,
        }

        try {
            // Verificar si token no son nulos
            if (tokenn) {
                const response = await axios.put('http://3.219.197.64:8090/dataUser/update', objDataUser, {
                    headers: {
                        'Authorization': `Bearer ${tokenn}`
                    }
                });
                if (response.status === 200) {
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 3000);
                    fetchDataUsuario();
                    handleClose();
                } else {
                    setMostrarAlertaError(true);
                    setTimeout(() => {
                        setMostrarAlertaError(false);
                    }, 3000);
                }
            } else {
                console.log('Usuario no autenticado');
                navigate('/login')

            }
        } catch (error) {
            setMostrarAlertaError(true);
            setTimeout(() => {
                setMostrarAlertaError(false);
            }, 3000);
        }
    };

    // Fin - Ver y Editar datos personales

    // Inicio - Ver y Editar datos de direcciones
    const navigateDirecciones = useNavigate();
    const [userDataDirection, setUserDataDirections] = useState({});

    const fetchDataDirections = async () => {
        try {
            const response = await fetch('http://3.219.197.64:8090/address/list',
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`,

                    },
                });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setUserDataDirections(data);
        } catch (error) {
            console.error('Error fetching DataUser:', error);
        }
    };

    const [openDir, setOpenDir] = useState(false);

    const handleOpenDir = () => {
        setOpenDir(true);
    };

    const handleCloseDir = () => {
        setOpenDir(false);
    };

    const countryRef = useRef(null);
    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const postalCodeRef = useRef(null);
    const mainAddressRef = useRef(null);
    const streetAddress1Ref = useRef(null);
    const streetAddress2Ref = useRef(null);
    const descriptionRef = useRef(null);

    const handleClicDir = async () => {
        // Accedemos a los valores de los campos de texto utilizando las referencias
        const countryLabel = countryRef.current.value;
        const stateLabel = stateRef.current.value;
        const cityLabel = cityRef.current.value;
        const postalCodeLabel = postalCodeRef.current.value;
        const mainAddressLabel = mainAddressRef.current.value;
        const streetAddress1Label = streetAddress1Ref.current.value;
        const streetAddress2Label = streetAddress2Ref.current.value;
        const descriptionLabel = descriptionRef.current.value;

        // Realiza cualquier otra lógica que necesites con estos valores

        var objDataDirection = {
            country: countryLabel,
            state: stateLabel,
            city: cityLabel,
            postalCode: postalCodeLabel,
            mainAddress: mainAddressLabel,
            streetAddress1: streetAddress1Label,
            streetAddress2: streetAddress2Label,
            description: descriptionLabel,
        }

        try {
            // Verificar si token no son nulos
            if (tokenn) {
                const response = await axios.put('http://3.219.197.64:8090/address/update', objDataDirection, {
                    headers: {
                        'Authorization': `Bearer ${tokenn}`
                    }
                });
                if (response.status === 200) {
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 3000);
                    fetchDataDirections();
                    handleCloseDir();
                } else {
                    setMostrarAlertaError(true);
                    setTimeout(() => {
                        setMostrarAlertaError(false);
                    }, 3000);
                }
            } else {
                console.log('Usuario no autenticado');
                navigateDirecciones('/login')

            }
        } catch (error) {
            setMostrarAlertaError(true);
            setTimeout(() => {
                setMostrarAlertaError(false);
            }, 3000);
        }
    };

    // Fin - Ver y Editar datos de direcciones 

    // Inicio - Ver y Editar Tarjetas

    const navigateCC = useNavigate();
    const [userDataCC, setUserDataCC] = useState({});

    const fetchDataCC = async () => {
        try {
            const response = await fetch('http://3.219.197.64:8090/paymentcc/list',
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`,

                    },
                });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setUserDataCC(data);
        } catch (error) {
            console.error('Error fetching DataUser:', error);
        }
    };

    const [openCC, setOpenCC] = useState(false);

    const handleOpenCC = () => {
        setOpenCC(true);
    };

    const handleCloseCC = () => {
        setOpenCC(false);
    };

    // Crear variables para editarlas 
    const ccRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const cvvRef = useRef(null);

    const [selectedMonth, setSelectedMonth] = useState(userDataCC.month);

    const handleClicCC = async () => {
        // Accedemos a los valores de los campos de texto utilizando las referencias
        const ccLabel = ccRef.current.value;
        const monthLabel = monthRef.current.value;
        const yearLabel = yearRef.current.value;
        const cvvLabel = cvvRef.current.value;

        // Lógica para el PUT

        var objDataUserCC = {
            cc: ccLabel,
            month: monthLabel,
            year: yearLabel,
            cvv: cvvLabel,
        }

        try {
            // Verificar si token no son nulos
            if (tokenn) {
                const response = await axios.put('http://3.219.197.64:8090/paymentcc/update', objDataUserCC, {
                    headers: {
                        'Authorization': `Bearer ${tokenn}`
                    }
                });
                if (response.status === 200) {
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 3000);
                    fetchDataCC();
                    handleCloseCC();
                } else {
                    setMostrarAlertaError(true);
                    setTimeout(() => {
                        setMostrarAlertaError(false);
                    }, 3000);
                }
            } else {
                console.log('Usuario no autenticado');
                navigateCC('/login')

            }
        } catch (error) {
            setMostrarAlertaError(true);
            setTimeout(() => {
                setMostrarAlertaError(false);
            }, 3000);
        }
    };

    const [creditCardNumber, setCreditCardNumber] = useState(userDataCC.cc);
    const handleInputChangeCC = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        value = value.slice(0, 16);
        setCreditCardNumber(value);
    };


    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];


    const handleInputChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const [yearNumber, setYearNumber] = useState(userDataCC.year);
    const handleInputChangeYear = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        value = value.slice(0, 2);
        setYearNumber(value);
    };

    const [cvvNumber, setCvvNumber] = useState(userDataCC.cvv);
    const handleInputChangeCVV = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        value = value.slice(0, 3);
        setCvvNumber(value);
    };
    // Fin - Ver y Editar Tarjetas

    // Inicio - Ver y Editar datos personales 
    const navigatehHistorial = useNavigate();
    const [userDataHistorial, setUserDataHistorial] = useState([]);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      };

    // GET historial
    const fetchDataHistorial = async () => {
        try {
            const response = await fetch('http://3.219.197.64:8090/order/listUser',
                {
                    headers: {
                        Authorization: `Bearer ${tokenn}`,

                    },
                });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setUserDataHistorial(data);
        } catch (error) {
            console.error('Error fetching DataUserHistorial:', error);
        }
    };
    //    // Fin de GET historial

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    backgroundColor: darkMode ? '#1A2027' : '#fff',
                    paddingBottom: '50px',
                }}
            >
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    {mostrarAlerta && (
                        <Alert severity="success">
                            <AlertTitle>¡Actualizado!</AlertTitle>
                            Se han guardado los datos.
                        </Alert>
                    )}
                    {mostrarAlertaError && (
                        <Alert severity="error">
                            <AlertTitle>¡Algo salió mal!</AlertTitle>
                            Error al guardar los datos.
                        </Alert>
                    )}
                </div>

                {/* Modal para Editar Datos Personales */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 2,
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: darkMode ? '#fff' : '#000' }}>
                            Editar datos personales
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                defaultValue={userData.first_name}
                                label="Nombres"
                                inputRef={firstNameRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userData.last_name}
                                label="Apellidos"
                                inputRef={lastNameRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userData.phone}
                                label="Teléfono"
                                inputRef={phoneRef}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleClose} sx={{ mr: 2 }} variant="outlined" >Cerrar</Button>
                            <Button onClick={handleClic} variant="contained">Guardar</Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal para Editar Datos de Dirección */}

                <Modal
                    open={openDir}
                    onClose={handleCloseDir}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 2,
                            overflowY: 'scroll',
                            maxHeight: '80vh'
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: darkMode ? '#fff' : '#000' }}>
                            Editar dirección
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.city}
                                label="Ciudad"
                                inputRef={cityRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.state}
                                label="Estado"
                                inputRef={stateRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.country}
                                label="País"
                                inputRef={countryRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.mainAddress}
                                label="Dirección"
                                inputRef={mainAddressRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.description}
                                label="Descripción"
                                inputRef={descriptionRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.postalCode}
                                label="Código Postal"
                                inputRef={postalCodeRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.streetAddress1}
                                label="Calle 1"
                                inputRef={streetAddress1Ref}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                defaultValue={userDataDirection.streetAddress2}
                                label="Calle 2"
                                inputRef={streetAddress2Ref}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCloseDir} sx={{ mr: 2 }} variant="outlined" >Cerrar</Button>
                            <Button onClick={handleClicDir} variant="contained">Guardar</Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal para Editar Datos de Tarjeta */}
                <Modal
                    open={openCC}
                    onClose={handleCloseCC}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 2,
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: darkMode ? '#fff' : '#000' }}>
                            Editar datos de tarjeta
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                onChange={handleInputChangeCC}
                                fullWidth
                                defaultValue={userDataCC.cc}
                                // defaultValue={userDataCC.cc}
                                value={creditCardNumber}
                                label="Número de tarjeta"
                                inputRef={ccRef}
                                sx={{ mb: 2 }}
                            />
                            <Select style={{ marginBottom: '20px' }}
                                fullWidth
                                labelId="month-select-label"
                                id="month-select"
                                inputRef={monthRef}
                                defaultValue={userDataCC.month}
                                value={selectedMonth}
                                label="Mes"
                                onChange={handleInputChangeMonth}
                            >
                                {months.map((month, index) => (
                                    <MenuItem key={index + 1} value={String(index + 1).padStart(2, '0')}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <TextField
                                fullWidth
                                defaultValue={userDataCC.month}
                                label="Mes"
                                inputRef={monthRef}
                                sx={{ mb: 2 }}
                            /> */}
                            <TextField
                                type="text"
                                onChange={handleInputChangeYear}
                                fullWidth
                                defaultValue={userDataCC.year}
                                value={yearNumber}
                                label="Año"
                                inputRef={yearRef}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                type="text"
                                onChange={handleInputChangeCVV}
                                fullWidth
                                defaultValue={userDataCC.cvv}
                                value={cvvNumber}
                                label="CVV"
                                inputRef={cvvRef}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCloseCC} sx={{ mr: 2 }} variant="outlined" >Cerrar</Button>
                            <Button onClick={handleClicCC} variant="contained">Guardar</Button>
                        </Box>
                    </Box>
                </Modal>

                <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Mis datos personales
                                </Typography>
                                <Item label="Nombre" value={userData.first_name} />
                                <Item label="Apellidos" value={userData.last_name} />
                                <Item label="Teléfono" value={userData.phone} />
                                <Item label="Correo" value={userData.user_id} />
                                {/* <Item label="Contraseña" value={userData.password} /> */}
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}
                                        onClick={handleOpen}>
                                        Editar Perfil
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Información de Dirección
                                </Typography>

                                <Item label="Ciudad" value={userDataDirection.country} />
                                <Item label="Estado" value={userDataDirection.state} />
                                <Item label="País" value={userDataDirection.city} />
                                <Item label="Dirección" value={userDataDirection.mainAddress} />
                                <Item label="Descripción" value={userDataDirection.description} />
                                <Item label="Código Postal" value={userDataDirection.postalCode} />
                                <Item label="Calle 1" value={userDataDirection.streetAddress1} />
                                <Item label="Calle 2" value={userDataDirection.streetAddress2} />
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}
                                        onClick={handleOpenDir}>
                                        Editar Dirección
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Datos de tarjeta
                                </Typography>
                                <Item label="Número de tarjeta" value={userDataCC.cc} />
                                <Item label="Mes" value={userDataCC.month} />
                                <Item label="Año" value={userDataCC.year} />
                                <Item label="CVV" value={userDataCC.cvv !== null ? '***' : ' '} />
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}
                                        onClick={handleOpenCC}>
                                        Editar tarjeta
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Historial de compras
                                </Typography>
                                {userDataHistorial.map((item, index) => (
                                    <div key={index}>
                                    <Item label={"Status: "} value={item.status} />
                                    <Item label={"Repartidor: "} value={item.repartidor} />
                                    <Item label={"Fecha de compra: "} value={formattedDate(item.date_order)} />
                                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                    </div>
                                ))}

                                {/* Renderizar las compras 
                                {compras.map((compra, index) => (
                                    <div key={index}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={compra.imageUrl} alt="Producto" style={{ maxWidth: '100px', height: 'auto', alignItems: 'Center' }} />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <div>
                                                    <Item label="Producto" value={compra.name} />
                                                    <Item label="Precio" value={compra.price} />
                                                    <Item label="Cantidad" value={compra.cantidad} />
                                                    <Item label="Status" value={compra.cantidad} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                    </div>
                                ))}
                                */}

                                {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined">
                                        Ver Historial de Compras
                                    </Button>
                                </Box> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

const Item = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
        <Typography variant="body1">{label}:</Typography>
        <Typography variant="body1" color="text.secondary">
            {value}
        </Typography>
    </Box>
);

export default UserProfile;
