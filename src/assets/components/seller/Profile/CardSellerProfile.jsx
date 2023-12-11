import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import sellerImage from "../../../images/VendedorSitili.jpg"

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
          Vendedor SITILI
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop={2} >
          Vendedor de la pagina de SITILI, como vendedor podras
          acceder al dashboard con los datos mas importantes, asi como tambien
          poder visualizar y crear usuarios, crear categorias para los proudctos, visualizar ganancias y el equipo conformado en SITILI
        </Typography>
      </CardContent>
      
    </Card>
  );
}
