import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import sellerImage from "../../../../images/VendedorSitili.jpg"

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

export default function CardSellerProfile() {
  
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        alt="vendedor sitili"
        height="auto"
        width="100%"
        image={sellerImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          The Weeknd
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: 'none' }}
        >
          Cambiar Foto
          <VisuallyHiddenInput type="file" />
        </Button>
        <Typography variant="body2" color="text.secondary" marginTop={2} >
          Vendedor de la pagina de SITILI, como vendedor podras
          acceder al dashboard con los datos mas importantes, asi como tambien
          poder visualizar y crear usuarios, crear categorias para los proudctos, visualizar ganancias y el equipo conformado en SITILI
        </Typography>
      </CardContent>
      
    </Card>
  );
}
