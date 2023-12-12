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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";

const PedidosTableS = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEditClick = async (product) => {
    try {
      const response = await fetch(
        "http://3.219.197.64:8090/orderDetail/statusOrderDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: product.detalles,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setSnackbarSeverity("success");
        setSnackbarMessage("Estado de detalle modificado");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error en modificar el estado del detalle");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Estado del pedido se modifico exitosamente");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://3.219.197.64:8090/orderDetail/listOrderDetails",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
                  #
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Nombre
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Cantidad
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  No. Orden
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
                  <TableCell>{product.detalles}</TableCell>
                  <TableCell>{product.producto}</TableCell>
                  <TableCell>{product.cantidad}</TableCell>
                  <TableCell>{product.orden}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor:
                          product.estado === "Pendiente"
                            ? "gray"
                            : product.estado === "Trafico"
                            ? "#1976D2"
                            : "#6737A8",
                        color: "white",
                      }}
                    >
                      {product.estado === "Pendiente"
                        ? "Pendiente"
                        : product.estado === "Trafico"
                        ? "En entrega"
                        : "Entregado"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={
                            product.estado === "Pendiente" ? (
                              <LocalShippingIcon />
                            ) : (
                              <PendingIcon />
                            )
                          }
                          sx={{ width: "130px" }}
                          onClick={() => handleEditClick(product)}
                          disabled={product.estado !== "Pendiente"}
                        >
                          {product.estado === "Pendiente"
                            ? "Enviar"
                            : product.estado === "Trafico"
                            ? "enviando"
                            : "Entregado"}
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
    </>
  );
};

export default PedidosTableS;
