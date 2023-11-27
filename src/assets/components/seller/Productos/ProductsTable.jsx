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
import ModalPictures from "./ModalPictures";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEditModalOpen = (product) => {
    setEditedProduct({ ...product });
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
      const res = await fetch(
        `http://localhost:8090/product/${editedProduct.product_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editedProduct),
        }
      );
      const updatedProduct = await res.json();

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.product_id === updatedProduct.product_id ? updatedProduct : p
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8090/product/listAllVend", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setProducts(data);
        console.log("Productos:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleModalOpen = (product) => {
    console.log("Id del producto:", product.product_id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
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
                  Fotos
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
                    <ModalPictures
                      product={product}
                      open={handleModalOpen}
                      onClose={handleModalClose}
                    />
                  </TableCell>
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
                          onClick={() => {}}
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
              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={editedProduct ? editedProduct.precio : ""}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, precio: e.target.value })
                }
              />
            </div>

            <div>
              <label>Fotos:</label>
              {editedProduct &&
                editedProduct.imagenes &&
                editedProduct.imagenes.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                    }}
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

export default ProductsTable;