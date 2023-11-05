import React from "react";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import ImagesSeller from "./ImagesSeller";
import CardSellerProfile from "./CardSellerProfile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const Name = "Abel Tesfaye";
const Correo = "the.weeknd@gmail.com"
const Pass = "****"

const ProfileSeller = ({ darkMode, setDarkMode }) => {
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
          <SidenavSeller />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column", marginLeft: 1 }}>
            <h1>Perfil Seller</h1>

            
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={0}
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              >
                <Grid item xs={4}>
                  <CardSellerProfile/>
                </Grid>
                <Grid item xs={8}>
                  <Item>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "18px" }}
                        >
                          <strong>Nombre:</strong> {Name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Item>
                  <Item
                    sx={{ marginTop: 1 }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "18px" }}
                        >
                          <strong>Correo:</strong> {Correo}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Item>
                  <Item
                    sx={{ marginTop: 1 }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "18px" }}
                        >
                          <strong>Contraseña:</strong> {Pass}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Item>
                  <Divider
                    sx={{marginTop:5}}
                  />
                  <ImagesSeller
                    sx={{marginBottom:5}}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileSeller;
