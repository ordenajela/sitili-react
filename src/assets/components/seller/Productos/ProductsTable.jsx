import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisuallyHiddenInput from "@mui/material/Input";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "30%",
  },
  "& .MuiDialogTitle-root": {
    margin: 0,
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesNames, setSelectedImagesNames] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleFileChangeImages = (event) => {
    const files = event.target.files;
    const newSelectedImages = [];
    const newSelectedImagesNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 5 * 1024 * 1024) {
        newSelectedImages.push(file);
        newSelectedImagesNames.push(file.name);
      } else {
        alert(
          `El archivo ${file.name} excede el límite de tamaño (5 MB) y no será agregado.`
        );
      }
    }

    setSelectedImages(newSelectedImages);
    setSelectedImagesNames(newSelectedImagesNames);
  };

  const toggleProductStatus = async (product) => {
    try {
      const { product_id } = product;

      const response = await fetch("http://3.219.197.64:8090/product/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: product_id }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedProduct = responseData;

        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) =>
            prevProduct.product_id === updatedProduct.product_id
              ? updatedProduct
              : prevProduct
          )
        );

        handleSnackbar("Estado del producto actualizado", "success");
      } else {
        handleSnackbar("Error al cambiar el estado del producto", "error");
      }
    } catch (error) {
      handleSnackbar("Se ha realizado el cambio con exito", "success");
    }
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      if (
        !editedProduct.producto ||
        !editedProduct.precio ||
        !editedProduct.cantidad ||
        !editedProduct.comentarios
      ) {
        handleSnackbar("Todos los campos son obligatorios", "error");
        return;
      }
  
      const formData = new FormData();
  
      const productData = {
        product_id: editedProduct.product_id,
        name: editedProduct.producto,
        stock: parseInt(editedProduct.cantidad),
        price: editedProduct.precio,
        features: editedProduct.comentarios,
      };
  
      formData.append(
        "productData",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );
  
      if (selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append("files", selectedImages[i]);
        }
      } else {
        if (editedProduct.imagenes && editedProduct.imagenes.length > 0) {
          for (let i = 0; i < editedProduct.imagenes.length; i++) {
            formData.append("files", editedProduct.imagenes[i]);
          }
        }
      }
  
      const response = await fetch("http://3.219.197.64:8090/product/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        handleEditModalClose();
      } else {
      }
    } catch (error) {
    }
  };

  const handleEditModalOpen = (product) => {
    setEditedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditedProduct(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://3.219.197.64:8090/product/listAllVend", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
      }
    };

    fetchProducts();
  }, [snackbarOpen]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveImage = async (indexToRemove) => {
    try {
      if (editedProduct.imagenes.length === 1) {
        handleSnackbar("No se puede eliminar la última imagen", "error");
        return;
      }

      const res = await fetch("http://3.219.197.64:8090/product/deleteImages", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editedProduct.product_id,
          imageUrl: editedProduct.imagenes[indexToRemove],
        }),
      });

      if (res.status === 200) {
        setEditedProduct((prevProduct) => {
          const updatedImages = prevProduct.imagenes.filter(
            (_, index) => index !== indexToRemove
          );
          return {
            ...prevProduct,
            imagenes: updatedImages,
          };
        });
        handleSnackbar("Se ha eliminado la imagen", "success");
      } else {
        handleSnackbar("Error al eliminar la imagen", "error");
      }
    } catch (error) {
      handleSnackbar("Error en la petición", "error");
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        <TableContainer
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            "@media (max-width: 600px)": {
              maxWidth: "100%",
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Nombre
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Precio
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Cantidad
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Categoria
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Calificacion
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Comentarios
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Estado
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? products.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : products
              ).map((product) => (
                <TableRow
                  key={product.product_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{product.producto}</TableCell>
                  <TableCell>{product.precio}</TableCell>
                  <TableCell>{product.cantidad}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>
                    <Rating
                      name="read-only"
                      value={product.calificacion}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>{product.comentarios}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor: product.estado ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {product.estado ? "Activo" : "Inactivo"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={
                            product.estado ? (
                              <RemoveCircleOutlineIcon />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )
                          }
                          sx={{ width: "130px" }}
                          onClick={() => toggleProductStatus(product)}
                        >
                          {product.estado ? "Desactivar" : "Activar"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{ marginLeft: 2, width: "130px" }}
                          onClick={() => handleEditModalOpen(product)}
                        >
                          Editar
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 20, 50]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <StyledDialog open={isEditModalOpen} onClose={handleEditModalClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Editar Producto</DialogTitle>
        <CloseButton aria-label="close" onClick={handleEditModalClose}>
          <CloseIcon />
        </CloseButton>
        <DialogContent>
          <form>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="producto"
                label="Nombre"
                variant="outlined"
                value={editedProduct ? editedProduct.producto : ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    producto: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="precio"
                label="Precio"
                type="number"
                variant="outlined"
                value={editedProduct ? editedProduct.precio : ""}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, precio: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="cantidad"
                label="Cantidad"
                type="number"
                variant="outlined"
                value={editedProduct ? editedProduct.cantidad : ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    cantidad: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="comentarios"
                label="Comentarios"
                multiline
                rows={4}
                variant="outlined"
                value={editedProduct ? editedProduct.comentarios : ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    comentarios: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Fotos:</label>
              <ImageList
                sx={{ width: "100%", height: 200 }}
                cols={3}
                rowHeight={164}
              >
                {editedProduct &&
                  editedProduct.imagenes &&
                  editedProduct.imagenes.map((foto, index) => (
                    <ImageListItem key={index}>
                      <IconButton
                        style={{
                          position: "absolute",
                          top: 1,
                          right: 1,
                          zIndex: 1,
                          color: "red",
                          borderRadius: "50%",
                          backgroundColor: "white",
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                      <img
                        srcSet={`${foto}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${foto}?w=164&h=164&fit=crop&auto=format`}
                        alt={`Foto ${index + 1}`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ textTransform: "none", marginTop: "16px" }}
              >
                {selectedImagesNames.length > 0
                  ? `Imagenes Seleccionadas: ${selectedImagesNames.join(", ")}`
                  : "Agregar Imágenes"}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChangeImages}
                />
              </Button>
            </div>
          </form>
        </DialogContent>

        <DialogActions onClick={handleUpdateProduct}>
          <Button variant="contained">Editar</Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ProductsTable;
