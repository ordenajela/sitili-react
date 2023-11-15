import React from "react";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import { Box, Grid } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModalUsers from "../../../../components/admin/ModalUsers";

const UserAd = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const tokencito = localStorage.getItem("token");
  console.log("Token:", tokencito);

  const userList = async () => {
    try {
      const res = await fetch("http://localhost:8090/users/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                <h1> Lista de Usuarios</h1>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center", 
                }}
              >
                <ModalUsers/>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserAd;
import React from "react";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import ModalUsers from "../../../../components/admin/ModalUsers";

const UserAd = ({ darkMode, setDarkMode }) => {
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
                <h1>Vendedores y Administradores</h1>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center", 
                }}
              >
                <ModalUsers/>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserAd;
