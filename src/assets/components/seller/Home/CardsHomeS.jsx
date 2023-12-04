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

export default function CardsHomeS() {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalEnvios, setTotalEnvios] = useState(null);
  const [totalVentas, setTotalVentas] = useState(null);
  const [totalEstrellas, setTotalEstrellas] = useState(null);
  const iconSize = 50;

  useEffect(() => {
    const fetchTotalVentas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/order/sellerSales",
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
          const cantidadV = data;
          setTotalVentas(cantidadV);
        } else {
          setTotalVentas(0);
        }
      } catch (error) {
        setTotalVentas(0);
      }
    };

    fetchTotalVentas();
  }, []);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/product/totSeller",
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
          const cantidadP = data;
          setTotalProducts(cantidadP);
        } else {
          setTotalProducts(0);
        }
      } catch (error) {
        setTotalProducts(0);
      }
    };

    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchTotalEnvios = async () => {
      try {
        const response = await fetch("http://localhost:8090/order/sellerEnvs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const cantidadE = data;
          setTotalEnvios(cantidadE);
        } else {
          setTotalEnvios(0);
        }
      } catch (error) {
        setTotalEnvios(0);
      }
    };

    fetchTotalEnvios();
  }, []);

  useEffect(() => {
    const fetchEstrellas = async () => {
      try {
        const response = await fetch("http://localhost:8090/raiting/rateSeller", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const cantidadS = data;
          setTotalEstrellas(cantidadS);
        } else {
          setTotalEstrellas(0);
        }
      } catch (error) {
        setTotalEstrellas(0);
      }
    };

    fetchEstrellas();
  }, []);

  const cardStyles = {
    borderRadius: 20,
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
    <Box >
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
                  <Inventory2Icon
                    sx={{ fontSize: iconSize, color: gradientColors.purple }}
                  />
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
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto",
                  }}
                >
                  {totalVentas}
                </Typography>
                <IconButton color="primary" style={iconButtonStyles}>
                  <LocalAtmIcon
                    sx={{ fontSize: iconSize, color: gradientColors.blue }}
                  />
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
                  <SentimentSatisfiedAltIcon
                    sx={{ fontSize: iconSize, color: gradientColors.purple }}
                  />
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
                  {totalEstrellas}
                </Typography>
              </Box>
              <Typography
                color="text.primary"
                sx={{
                  marginTop: 2,
                  color: "white",
                }}
              >
                Productos con 4★ o mas
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
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto",
                  }}
                >
                  {totalEnvios}
                </Typography>
                <IconButton color="primary" style={iconButtonStyles}>
                  <LocalShippingIcon
                    sx={{ fontSize: iconSize, color: gradientColors.blue }}
                  />
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
