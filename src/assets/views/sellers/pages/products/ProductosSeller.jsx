import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModalProducts from "../../../../components/seller/Productos/ModalProducts";
import { SidenavSeller } from "../../../../components/seller/SidenavSeller";
import NavbarSeller from "../../../../components/seller/NavbarSeller";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import ProductsTable from "../../../../components/seller/Productos/ProductsTable";

const ProductosSeller = ({ darkMode, setDarkMode }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const handleEditModalOpen = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product }); // Clonar el producto para editar sin modificar el original
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Realiza una solicitud al servidor para actualizar el producto
      // Puedes usar el método PUT o cualquier otro método adecuado
      // Asegúrate de manejar la actualización del producto en el servidor
      // y luego actualiza el estado `products` con la versión actualizada del producto
      // y cierra el modal de edición
      // Ejemplo ficticio (debes adaptarlo a tu backend):
      const res = await fetch(`http://localhost:8090/product/${editedProduct.product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedProduct),
      });
      const updatedProduct = await res.json();

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.product_id === updatedProduct.product_id ? updatedProduct : p))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8090/product/listAll');
        setProducts(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    
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
          <SidenavSeller/>
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Grid container>
              <Grid item xs={6}>
                <h1> Productos</h1>
                <Collapse>
                  <Alert severity='warning'
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Todos los Campos Son Obligatorios
                  </Alert>
                </Collapse>
              </Grid>
              <Grid item xs={6} sx={{display: "flex",justifyContent: "flex-end",alignItems: "center",}}>
                <ModalProducts
                  open={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  initialProduct={selectedProduct}
                />
              </Grid>
            </Grid>
            <Grid xs={{}}>
            <ProductsTable/>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
  <DialogTitle>Editar Producto</DialogTitle>
  <DialogContent>
    <form>
      <div>
        <label htmlFor="producto">Nombre:</label>
        <input
          type="text"
          id="producto"
          name="producto"
          value={editedProduct ? editedProduct.producto : ''}
          onChange={(e) => setEditedProduct({ ...editedProduct, producto: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={editedProduct ? editedProduct.precio : ''}
          onChange={(e) => setEditedProduct({ ...editedProduct, precio: e.target.value })}
        />
      </div>
      {/* Otros campos del formulario */}

      {/* Mostrar las fotos */}
      <div>
        <label>Fotos:</label>
        {editedProduct && editedProduct.imagenes &&
          editedProduct.imagenes.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Foto ${index + 1}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          ))}
      </div>
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleEditModalClose}>Cancelar</Button>
    <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
  </DialogActions>
</Dialog>
    </>
  );
};

export default ProductosSeller;
