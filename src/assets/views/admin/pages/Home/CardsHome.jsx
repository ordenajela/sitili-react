import * as React from "react";
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
  const iconSize = 48;
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card style={{ backgroundColor: "#1976D2", marginLeft: 10 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="primary">
                <Inventory2Icon sx={{ fontSize: iconSize, color: "white" }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: "auto",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                12501
              </Typography>
            </Box>
            <Typography
              color="text.primary"
              sx={{
                marginTop: 2,
              }}
            >
              Productos en SITILI
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card style={{ backgroundColor: "#1976D2" }}>
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
                sx={{ fontSize: "40px", fontWeight: "bold" }}
              >
                $150187
              </Typography>
              <IconButton color="primary" sx={{ marginLeft: "auto" }}>
                <LocalAtmIcon sx={{ fontSize: iconSize, color: "white" }} />
              </IconButton>
            </Box>
            <Typography
              color="text-.primary"
              sx={{
                marginTop: 2,
              }}
            >
              De Ventas totales
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card style={{ backgroundColor: "#1976D2" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="primary">
                <SentimentSatisfiedAltIcon
                  sx={{ fontSize: iconSize, color: "white" }}
                />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: "auto",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                150
              </Typography>
            </Box>
            <Typography
              color="text.primary"
              sx={{
                marginTop: 2,
              }}
            >
              Integrantes de SITILI
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card style={{ backgroundColor: "#1976D2", marginRight: 10 }}>
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
                sx={{ fontSize: "40px", fontWeight: "bold" }}
              >
                120
              </Typography>
              <IconButton color="primary" sx={{ marginLeft: "auto" }}>
                <LocalShippingIcon
                  sx={{ fontSize: iconSize, color: "white" }}
                />
              </IconButton>
            </Box>
            <Typography
              color="text.primary"
              sx={{
                marginTop: 2,
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
