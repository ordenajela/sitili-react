import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/Logo-Horizintal-Blanco.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import { useNavigate } from 'react-router-dom';
import UserShoppingCar from '../views/users/pages/user-shopping-car';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Typography } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    display: 'flex', // Centra horizontalmente los elementos dentro de 'Search'
    alignItems: 'center', // Centra verticalmente los elementos dentro de 'Search'
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({ darkMode, setDarkMode }) {
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const navigateProfile = () => {
        navigate('/user/perfil');
    }
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        navigate('/login');
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        // localStorage.removeItem("token");
        // localStorage.removeItem("rol");
        // navigate('/login');
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link to="../perfil" style={{ textDecoration: 'none', color: 'inherit' }}>Mi perfil</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Cerrar sesión </Link>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="../carrito" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton color="inherit" >
                        <ShoppingCartIcon />
                        <Typography style={{ marginLeft: '5px' }}>Carrito</Typography>
                    </IconButton>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to="../favoritos" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton color="inherit" >
                        <FavoriteIcon />
                        <Typography style={{ marginLeft: '5px' }}>Favoritos</Typography>
                    </IconButton>
                </Link>
            </MenuItem>
            <MenuItem>
                <IconButton
                    onClick={toggleDarkMode}
                    color="inherit"
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
                    <Typography style={{ marginLeft: '5px' }}>Cambiar tema</Typography>
                </IconButton>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                    <Typography style={{ marginLeft: '5px' }}>Mi perfil</Typography>
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/user/home">
                        <img src={logoImage} alt="Logo" style={{ height: '50px', marginTop: '3%' }} />
                    </Link>
                    <Search style={{ marginLeft: '5%' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Busca tu producto..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="../favoritos" style={{ textDecoration: 'none', color: 'white' }}>
                            <IconButton size="large" color="inherit">
                                <FavoriteIcon />
                            </IconButton>
                        </Link>
                        <Link to="../carrito" style={{ textDecoration: 'none', color: 'white' }}>
                            <IconButton
                                size="large"
                                color="inherit"
                            >
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                        <IconButton
                            size="large"
                            onClick={toggleDarkMode}
                            color="inherit"
                        >
                            {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
                        </IconButton>

                        <IconButton
                            size="large"
                            onClick={navigateProfile}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                        <IconButton
                            size="large"
                            onClick={cerrarSesion}
                            color="inherit"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}