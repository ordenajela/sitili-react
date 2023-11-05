import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';


export default function CardsHome() {
    const iconSize = 48;
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card style={{ backgroundColor: '#6D2D6D', marginLeft:10,  }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton color="primary">
                                <Inventory2Icon sx={{ fontSize: iconSize, color: 'white' }} />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ marginLeft: 'auto', fontSize: '40px', fontWeight: 'bold' }}>
                                12501
                            </Typography>
                        </Box>
                        <Typography color="text.primary"
                            
                        >
                            Productos en SITILI
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ textTransform: 'none' }}>Ver mas</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card style={{ backgroundColor: '#2D696D' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                                $150187
                            </Typography>
                            <IconButton color="primary" sx={{ marginLeft: 'auto' }}>
                                <LocalAtmIcon sx={{ fontSize: iconSize, color: 'white' }} />
                            </IconButton>
                        </Box>
                        <Typography color="text.primary"
                           
                        >
                            De Ventas totales
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" sx={{ textTransform: 'none' }}>Ver mas</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card style={{ backgroundColor: '#6D312D' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton color="primary">
                                <SentimentSatisfiedAltIcon sx={{ fontSize: iconSize, color: 'white' }} />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ marginLeft: 'auto', fontSize: '40px', fontWeight: 'bold' }}>
                                150
                            </Typography>
                        </Box>
                        <Typography color="text.primary"
                            
                        >
                            Integrantes de SITILI
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" sx={{ textTransform: 'none' }}>Ver mas</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card style={{ backgroundColor: '#00BFB2', marginRight:10 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                                120
                            </Typography>
                            <IconButton color="primary" sx={{ marginLeft: 'auto' }}>
                                <LocalShippingIcon sx={{ fontSize: iconSize, color: 'white' }} />
                            </IconButton>
                        </Box>
                        <Typography color="text.primary"
                            
                        >
                            Envios Realizados
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" sx={{ textTransform: 'none' }}>Ver mas</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
