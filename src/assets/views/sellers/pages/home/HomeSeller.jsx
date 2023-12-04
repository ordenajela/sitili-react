import React, { useEffect, useState } from "react";
import {Box, Typography,Modal,Button,TextField,FormControl,InputLabel,Input,} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardsHomeS from "../../../../components/seller/Home/CardsHomeS";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import { Pie } from "recharts";
import PieCategorias from "../../../../components/seller/Home/PieCategorias";
import Grid from "@mui/material/Grid";
import PieTotalC from "../../../../components/seller/Home/PieTotalC";
import VentasSellerChart from "../../../../components/seller/Home/VentasSellerChart";
import PedidosSellerChart from "../../../../components/seller/Home/PedidosSellerChart";

const HomeSeller = ({ darkMode, setDarkMode }) => {

  const [errorMessages, setErrorMessages] = useState({
    company: "",
    phone: "",
  });
  
  const [isRequesting, setIsRequesting] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyFormData, setCompanyFormData] = useState({
    email: "",
    company: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/users/validateCompany",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.email);
          setCompanyName(data.company);

          if (!data.company || data.company.trim() === "") {
            setShowCompanyModal(true);
          }
        } else {
          console.log("Checale algo anda mal");
        }
      } catch (error) {
        console.log("Error En el get:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleCompanyFormChange = (event) => {
    setCompanyFormData({
      ...companyFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCompany = async () => {

    const errors = {};
    const phoneRegex = /^[0-9]+$/;
    if (companyFormData.company.trim() === "") {
      errors.company = "El campo no puede estar vacío.";
    }
    if (companyFormData.phone.trim() === "") {
      errors.phone = "El campo no puede estar vacío.";
    }else if (!phoneRegex.test(companyFormData.phone)) {
      errors.phone = "El campo solo puede contener números.";
    }
   
    setErrorMessages(errors);
  
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8090/dataUser/updateCompany", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(companyFormData),
      });

      if (response.ok) {
        console.log("Company updated successfully");
        setErrorMessages({});
        setShowCompanyModal(false);
      } else {
        console.log("Checale algo anda mal");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setIsRequesting(false);
  };

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
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarSeller darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, marginX: 1 }}>
          <SidenavSeller />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column", marginX: 1 }}>
            <h1>Hola Vendedor!</h1>
            <CardsHomeS />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} >
                <PieCategorias />
              </Grid>
              <Grid item xs={12} sm={6} md={6} >
                <PieTotalC/>
              </Grid>
            </Grid>
            <VentasSellerChart/>
            <PedidosSellerChart/>
            {/* Modal */}
            <Modal
               open={showCompanyModal}
               onClose={() => !isRequesting && setShowCompanyModal(false)}
               disableEscapeKeyDown={isRequesting}
               BackdropProps={{
                 invisible: isRequesting,
                 onClick: isRequesting ? null : () => setShowCompanyModal(false),
               }}
               BackdropClick={false}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  bgcolor: "background.paper",
                  boxShadow: 15,
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Ya casi estás listo!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Completa tu perfil para poder comenzar a ser Vendedor SITILI.
                </Typography>
                <br></br>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  
                  <TextField  label="Compañia" variant="outlined"
                    id="company"
                    name="company"
                    value={companyFormData.company}
                    onChange={handleCompanyFormChange}
                    error={Boolean(errorMessages.company)}
                    helperText={errorMessages.company}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField  label="Telefono" variant="outlined"
                      id="phone"
                      name="phone"
                      type="number"
                      value={companyFormData.phone}
                      onChange={handleCompanyFormChange}
                      error={Boolean(errorMessages.phone)}
                      helperText={errorMessages.phone}
                    />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateCompany}
                >
                  Añadir
                </Button>
              </Box>
            </Modal>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomeSeller;
