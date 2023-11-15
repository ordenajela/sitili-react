import React from "react";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import { Box } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Products = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const userList = async () => {
    try {
      const res = await fetch("http://localhost:8090/product/listAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
      },
    });
    const data = await res.json();
    console.log("Data:", data);
    } catch (error) {
      console.log("Error:", error);
    }
    
  }
  console.log("UserList:", userList());

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavAdmin />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <h1>Productos</h1>
            {/* Agrega el contenido de la página aquí */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
