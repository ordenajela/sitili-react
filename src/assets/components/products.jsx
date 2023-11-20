import * as React from 'react';
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
import ProductImage from '../images/template-product.png';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

export default function ResponsiveGridWithPagination() {
    const itemsPerPage = 6;
    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const totalItems = 18;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <Box sx={{ flexGrow: 1, margin: '3%' }}>
            <Grid container spacing={2} justifyContent="center">
                {Array.from(Array(totalItems))
                    .slice(startIndex, endIndex)
                    .map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease',
                                },
                            }}>
                                <Link to="/">
                                    <img src={ProductImage} alt="Product Image"
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
                                        Product Name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Seller.
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Product description goes here.
                                    </Typography>
                                    <Typography gutterBottom variant="h6" color ='primary'>
                                        $10,000
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
                    count={Math.ceil(totalItems / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
}
