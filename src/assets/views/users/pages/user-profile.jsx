import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import PrimarySearchAppBar from "../../../components/navbar2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import StickyFooter from "../../../components/footer";
import ProductImage from "../../../images/template-product.png";

// Datos estáticos
const Name = "Luis Enrique";
const Lastname = "Brito Vargas";
const Correo = "20183ti013@utez.edu.mx";
const phone = "7772330626";
const Pass = "********";

const city = "Emiliano Zapata, Morelos";
const country = "México";
const description = "Casa color blanco";
const address = "Privada citrus #86";
const cp = "62566";
const street_1 = "Av. Universidad";
const street_2 = "3 de mayo";

const cc = "4242424242424242"
const cvv = "424";
const day = 24;
const month = 2;
const year = 24;

//const templateStringDireccion = `${city}, ${country}, ${description}, ${address}, ${cp}, 
//${street_1}, ${street_2}`;

//const templateStringTarjeta = `Número de tarjeta: ${cc} CVV: ${cvv} Fecha de vencimiento: ${month}/${year}`;

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

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    backgroundColor: darkMode ? '#1A2027' : '#fff',
                }}
            >
                <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Mis datos
                                </Typography>
                                <Item label="Nombre" value={Name} />
                                <Item label="Apellido" value={Lastname} />
                                <Item label="Telefono" value={phone} />
                                <Item label="Correo" value={Correo} />
                                <Item label="Contraseña" value={Pass} />
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}>
                                        Editar Perfil
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Información de Dirección
                                </Typography>
                                {/* <div>
                                    {templateStringDireccion}
                                </div> */}
                                <Item label="Ciudad" value={city} />
                                <Item label="País" value={country} />
                                <Item label="Dirección" value={description} />
                                <Item label="Dirección 1" value={address} />
                                <Item label="Código Postal" value={cp} />
                                <Item label="Calle 1" value={street_1} />
                                <Item label="Calle 2" value={street_2} />
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}>
                                        Editar Dirección
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Mis tarjertas
                                </Typography>
                                <Item label="Número de tarjeta" value={cc} />
                                <Item label="CVV" value={cvv} />
                                <Item label="Día" value={day} />
                                <Item label="Mes" value={month} />
                                <Item label="Año" value={year} />
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined" startIcon={<EditIcon />}>
                                        Editar tarjeta
                                    </Button>
                                </Box>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Historial de Compras
                                </Typography>
                                {/* Renderizar las compras */}
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
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outlined">
                                        Ver Historial de Compras
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <StickyFooter />
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
