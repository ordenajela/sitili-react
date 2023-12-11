import React, {useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
        {'Copyright © ' + ' '}
        <Link color="inherit" href="#">
        &nbsp; SITILI &nbsp;
        </Link>
        {' ' + new Date().getFullYear() + '.'}
      </Typography>
    );
  }
  

const theme = createTheme();

const footerStyles = {
  backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
  py: 2,
  px: 2,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1000,
  display: 'none', // Ocultar el footer inicialmente
};

const StickyFooter = () => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (documentHeight - windowHeight === scrollTop) {
      // Mostrar el footer al llegar al final de la página
      const footer = document.querySelector('#footer');
      if (footer) {
        footer.style.display = 'block';
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="footer" id="footer" sx={footerStyles}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StickyFooter;

