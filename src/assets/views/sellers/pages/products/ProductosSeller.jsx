import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModalProducts from "../../../../components/seller/Productos/ModalProducts";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import axios from "axios";

const ProductosSeller = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  //http:localhost:8090/product/listAll

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8090/product/listAll');

        console.log(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    }
  });

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
