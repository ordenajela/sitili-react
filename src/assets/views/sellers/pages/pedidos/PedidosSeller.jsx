import React from "react";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import PedidosTableS from "../../../../components/seller/Pedidos/PedidosTableS";

const PedidosSeller = ({ darkMode, setDarkMode }) => {
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
            <h1>Pedidos Seller</h1>
            {/* Agrega el contenido de la página aquí */}
            <PedidosTableS/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PedidosSeller;
