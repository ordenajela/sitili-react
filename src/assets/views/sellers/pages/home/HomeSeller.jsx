import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardsHomeS from "../../../../components/seller/Home/CardsHomeS";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";

const HomeSeller = ({ darkMode, setDarkMode }) => {

  var emailP = localStorage.getItem("email");
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
          // Handle other cases of unsuccessful response if needed
        }
      } catch (error) {
        console.log("Error:", error);
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
        setShowCompanyModal(false);
      } else {
        console.log("Checale algo anda mal");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <NavbarSeller darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
          <SidenavSeller />
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <h1>Hola Vendedor!</h1>
            <CardsHomeS />

            {/* Modal */}
            <Modal
              open={showCompanyModal}
              onClose={() => setShowCompanyModal(false)}
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
                  Completa tu perfil para poder comenzar a vender.
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel htmlFor="company">Compañía</InputLabel>
                  <Input
                    id="company"
                    name="company"
                    value={companyFormData.company}
                    onChange={handleCompanyFormChange}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel htmlFor="phone">Teléfono</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={companyFormData.phone}
                    onChange={handleCompanyFormChange}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateCompany}
                >
                  Actualizar
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
