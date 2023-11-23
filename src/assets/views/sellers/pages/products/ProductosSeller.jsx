import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModalProducts from "../../../../components/seller/Productos/ModalProducts";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

const ProductosSeller = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [products, setProducts] = useState(null);
  const [openA, setOpenA] = useState(false);
  const [missingData, setMissingData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8090/product/listAll');
        setProducts(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarSeller darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavSeller/>
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Grid container>
              <Grid item xs={6}>
                <h1> Productos</h1>
                <Collapse>
                  <Alert severity='warning'
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenA(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Todos los Campos Son Obligatorios
                  </Alert>
                </Collapse>
              </Grid>
              <Grid item xs={6} sx={{display: "flex",justifyContent: "flex-end",alignItems: "center",}}>
                <ModalProducts/>
              </Grid>
            </Grid>
            <Grid xs={{}}>
              
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductosSeller;
