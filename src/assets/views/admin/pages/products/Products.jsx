import React from "react";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import { Box, Grid } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GraficaPastelAdmin from "../../../../components/admin/products/GraficaPastelAdmin";

const Products = ({ darkMode, setDarkMode }) => {
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
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavAdmin />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Grid container>
              <Grid item xs={6}>
                <h1> Productos</h1>
              </Grid>
              <Grid item xs={6} sx={{display: "flex",justifyContent: "flex-end",alignItems: "center",}}>
                
              </Grid>
            </Grid>
            <Grid xs={{}}>
              <GraficaPastelAdmin/>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
