import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export default function CardsHome() {
  const [totalUsers, setTotalUsers] = useState(null);
  const iconSize = 48;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:8090/users/totalUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalUsers(data);
          console.log(data);
        } else {
          console.error("Error al obtener el total de usuarios");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchTotalUsers();
  }, []); 

  const cardStyles = {
    borderRadius: 16,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const gradientColors = {
    purple: "linear-gradient(135deg, #663399 0%, #673AB7 100%)",
    blue: "linear-gradient(135deg, #1976D2 0%, #2196F3 100%)",
  };

  const iconButtonStyles = {
    backgroundColor: "white",
    borderRadius: "50%",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card style={{ ...cardStyles, background: gradientColors.purple, marginLeft: 10 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="primary" style={iconButtonStyles}>
                <Inventory2Icon sx={{ fontSize: iconSize, color: gradientColors.purple }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: "auto",
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                12501
              </Typography>
            </Box>
            <Typography
              color="text.primary"
              sx={{
                marginTop: 2,
                color: "white",
              }}
            >
              Productos en SITILI
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card style={{ ...cardStyles, background: gradientColors.blue }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: "40px", fontWeight: "bold", color: "white", marginRight: "auto" }}
              >
                $150187
              </Typography>
              <IconButton color="primary" style={iconButtonStyles}>
                <LocalAtmIcon sx={{ fontSize: iconSize, color: gradientColors.blue }} />
              </IconButton>
            </Box>
            <Typography
              color="text-.primary"
              sx={{
                marginTop: 2,
                color: "white",
              }}
            >
              De Ventas totales
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card style={{ ...cardStyles, background: gradientColors.purple, marginLeft: 10 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="primary" style={iconButtonStyles}>
                <SentimentSatisfiedAltIcon sx={{ fontSize: iconSize, color: gradientColors.purple }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: "auto",
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {totalUsers}
              </Typography>
            </Box>
            <Typography
              color="text.primary"
              sx={{
                marginTop: 2,
                color: "white",
              }}
            >
              Integrantes de SITILI
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card style={{ ...cardStyles, background: gradientColors.blue }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: "40px", fontWeight: "bold", color: "white", marginRight: "auto"  }}
              >
                147
              </Typography>
              <IconButton color="primary" style={iconButtonStyles}>
                <LocalShippingIcon sx={{ fontSize: iconSize, color: gradientColors.blue }} />
              </IconButton>
            </Box>
            <Typography
              color="text-.primary"
              sx={{
                marginTop: 2,
                color: "white",
                alignItems: "center",
              }}
            >
              Envios Realizados
            </Typography>
          </CardContent>
        </Card>
      </Grid>  
    </Grid>
  );
}
