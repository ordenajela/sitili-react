import React, { useState, useEffect } from "react";
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
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalVentas, setTotalVentas] = useState(null);
  const [totalEnvios, setTotalEnvios] = useState(null);
  const iconSize = 48;

  useEffect(() => {
    const fetchTotalVentas = async () => {
      try {
        const response = await fetch("http://3.219.197.64:8090/order/saleAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalEnvios(data.total);
          setTotalVentas(data.vendidos);
        } else {
          
        }
      } catch (error) {
      }
    }
    fetchTotalVentas();
  });

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch("http://3.219.197.64:8090/product/listAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalProducts(data.length);
          
        } else {
          
        }
      } catch (error) {
        
      }
    };

    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://3.219.197.64:8090/users/totalUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalUsers(data);
        } else {
          
        }
      } catch (error) {
       
      }
    };
    fetchTotalUsers();
  }, []);

  const cardStyles = {
    borderRadius: 16,
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
    <Box  > 
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ ...cardStyles, background: gradientColors.purple }}>
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
                  {totalProducts}
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

        <Grid item xs={12} sm={6} md={3}>
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
                  ${totalEnvios}
                </Typography>
                <IconButton color="primary" style={iconButtonStyles}>
                  <LocalAtmIcon sx={{ fontSize: iconSize, color: gradientColors.blue }} />
                </IconButton>
              </Box>
              <Typography
                color="text.primary"
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

        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ ...cardStyles, background: gradientColors.purple }}>
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

        <Grid item xs={12} sm={6} md={3}>
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
                  {totalVentas}
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
    </Box>
  );
}
