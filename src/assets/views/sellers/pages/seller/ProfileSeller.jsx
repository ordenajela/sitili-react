import React, {useEffect} from "react";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import NavbarAdmin from "../../../../components/admin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import ImagesSeller from "./ImagesSeller";
import CardSellerProfile from "../../../../components/seller/Profile/CardSellerProfile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));


const ProfileSeller = ({ darkMode, setDarkMode }) => {

  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [celular, setCelular] = React.useState("");
  const [compañia, setCompañia] = React.useState("");

  useEffect(() =>{
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8090/dataUser/listu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        const data = await res.json()
        setCompañia(data.company);
        setEmail(data.user_id);
        setNombre(data.first_name + ' ' + data.last_name);
        setCelular(data.phone);

      } catch (error) {
        console.log("Error:", error)
      }
    }
    fetchUsers()
  })
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
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column"}}>
            <h1>Perfil Vendedor</h1>

            
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              >
                <Grid xs={12} md={4}>
                  <CardSellerProfile/>
                </Grid>
                <Grid xs={12} md={8}>
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
                          <strong>Nombre:</strong> {nombre}
                        </Typography>
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
                          <strong>Correo:</strong> {email}
                        </Typography>
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
                          <strong>Telefono:</strong> {celular}
                        </Typography>
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
                          <strong>Compañia:</strong> {compañia}
                        </Typography>
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
