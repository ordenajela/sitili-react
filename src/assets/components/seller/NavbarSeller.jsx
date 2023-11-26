import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import logoImage from '../../images/Logo-Horizintal-Blanco.png';
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const StyledTypography = styled(Typography)({
  flex: 1, 
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const StyledLink = styled(Link)({
  textDecoration: 'none', 
  color: 'inherit', 
});

export default function NavbarSeller({ darkMode, setDarkMode }) {
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
    navigate('/seller/perfil');
  }
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate('/login');
  }

  const handleMenuClose = () => {
    
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
      <StyledLink component={StyledLink} to="/seller/perfil" >
        <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
      </StyledLink>
     
      <MenuItem onClick={handleMenuClose}>Cerrar Sesion</MenuItem>
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
      
      <MenuItem onClick={toggleDarkMode} >
        <IconButton
          size="large"
          color="inherit"
        >
             {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
        </IconButton>
        <p>Modo de App</p>
      </MenuItem>
      <MenuItem onClick={navigateProfile}>
        <IconButton
          size="large"
          color="inherit"
        >
            <InvertColorsIcon />
        </IconButton>
        <p>Mi Perfil</p>
      </MenuItem>
      <MenuItem onClick={cerrarSesion}>
        <IconButton
          size="large"
          color="inherit"
        >
            <InvertColorsIcon />
        </IconButton>
        <p>Cerrar Sesión</p>
      </MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1,
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <StyledTypography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            SITILI
          </StyledTypography>
          
          <img src={logoImage} alt="Logo" style={{ borderRadius: '00%', maxWidth: '10%', margin: '0 auto', display: 'block' }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
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
