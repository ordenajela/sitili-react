import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import adminImage from '../../../../images/AdminSitili.jpg'

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CardAdminProfile() {
  
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        alt="Sitili"
        height="auto"
        width="100%"
        image={adminImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Leo Messi
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop={2} >
          Administrador de la pagina de SITILI, como administrador podras
          acceder al dashboard con los datos mas importantes, asi como tambien
          poder visualizar y crear usuarios, crear categorias para los proudctos, visualizar ganancias y el equipo conformado en SITILI
        </Typography>
      </CardContent>
      
    </Card>
  );
}
