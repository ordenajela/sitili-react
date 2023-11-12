import React from 'react';
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
  mt: 'auto',
};

export default function StickyFooter() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="footer" sx={footerStyles}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
