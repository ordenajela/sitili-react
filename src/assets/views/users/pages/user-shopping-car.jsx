import React from 'react';
import { Box, Grid, Typography, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrimarySearchAppBar from '../../../components/navbar2';
import ProductImage from '../../../images/template-product.png';
import StickyFooter from '../../../components/footer';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const CartItem = ({ item }) => {
    const [quantity, setQuantity] = React.useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    return (
        <TableRow>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: 100 }} />
                    <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                        {item.name}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="right">
                <Typography variant="body2" >
                    {item.price}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    variant="outlined"
                    style={{ minWidth: 80 }}
                >
                    {[...Array(10)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="right">
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                    Quitar
                </Button>
            </TableCell>
        </TableRow>
    );
};

const ShopingCar = ({ darkMode, setDarkMode, userData }) => {
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

    const cartItems = [
        {
            id: 1,
            name: 'Play Station 5 Marvels Spiderman Edition',
            price: '$19.99',
            imageUrl: ProductImage,
        },
        {
            id: 2,
            name: 'Producto 2',
            price: '$29.99',
            imageUrl: ProductImage,
        },
        // More items...
    ];

    return (
        <ThemeProvider theme={theme}>

            <div>
                <PrimarySearchAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Box sx={{
                    flexGrow: 1,
                    padding: 4,
                    backgroundColor: darkMode ? '#1A2027' : '#fff',
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Carrito de Compras
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <CartItem key={item.id} item={item} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                <Button variant="contained" color="primary" size="large">
                                    Comprar ahora
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <StickyFooter />
            </div>
        </ThemeProvider>
    );
};

export default ShopingCar;
