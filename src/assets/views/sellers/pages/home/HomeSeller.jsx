import React from "react";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardsHomeS from "../../../../components/seller/Home/CardsHomeS";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";

const HomeSeller = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarSeller darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavSeller />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <h1>Hola Vendedor!</h1>
            <CardsHomeS/>
            {/* Agrega el contenido de la página aquí */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomeSeller;
