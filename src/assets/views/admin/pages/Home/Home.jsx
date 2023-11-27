import React from "react";
import { SidenavAdmin } from "../../../../components/admin/SidenavAdmin";
import { Box } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardsHome from "../../../../components/admin/Home/CardsHome";
import SalesChart from "../../../../components/admin/Home/SalesChart";
import PedidosChart from "../../../../components/admin/Home/PedidosChart";
import Grid from '@mui/material/Grid';
import PieCategory from "../../../../components/admin/Home/PieCenterLabel";
import PieTotalCategory from "../../../../components/admin/Home/PieTotalCategory";
import NewUsersChart from "../../../../components/admin/Home/NewUsersChart";

const Home = ({ darkMode, setDarkMode, userData }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const tokenAdmin = localStorage.getItem("token");
  console.log(tokenAdmin);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavAdmin />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <h1>Hola Administrador!</h1>
            <CardsHome/>
            <Grid container spacing={3} style={{ width: '100%', marginTop: 2 }}>
              <Grid item xs={12} md={6}>
                <PieCategory/>
              </Grid>
              <Grid item xs={12} md={6}>
                <PieTotalCategory/>
              </Grid>
            </Grid>
            <SalesChart/>
            <PedidosChart/>
            <NewUsersChart/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
