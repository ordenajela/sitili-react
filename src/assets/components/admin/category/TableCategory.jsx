import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Grid from "@mui/material/Grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const TableCagory = () => {
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8090/categories/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCategory(data);
      } catch (error) {}
    };

    fetchCategories();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const response = await fetch("http://localhost:8090/categories/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: categoryId }),
      });

      if (response.ok) {
        const updatedCategories = category.map((c) =>
          c.id === categoryId ? { ...c, status: !currentStatus } : c
        );
        setCategory(updatedCategories);
        setAlert({
          open: true,
          type: "success",
          message: `Categoría ${
            currentStatus ? "desactivada" : "activada"
          } exitosamente.`,
        });
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } else {
        setAlert({
          open: true,
          type: "error",
          message: "Error al cambiar el estado de la categoría.",
        });
      }
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Error en la petición." });
    }
  };

  const handleEditModalOpen = (categoryId, categoryName) => {
    setEditedCategory({
      id: categoryId,
      name: categoryName,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedCategory({
      id: null,
      name: "",
    });
  };

  const handleEditCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8090/categories/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedCategory),
      });

      if (response.ok) {
        // Manejar éxito
        const updatedCategories = category.map((c) =>
          c.id === editedCategory.id ? { ...c, name: editedCategory.name } : c
        );
        setCategory(updatedCategories);
        setAlert({
          open: true,
          type: "success",
          message: "Categoría actualizada exitosamente.",
        });
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } else {
        setAlert({
          open: true,
          type: "error",
          message: "Error al actualizar la categoría.",
        });
      }
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Error en la petición." });
    } finally {
      handleEditModalClose();
    }
  };

  return (
    <div>
      {alert.open && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ ...alert, open: false })}
          style={{
            margin: "10px 0",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <AlertTitle>
            {alert.type === "success" ? "Éxito" : "Error"}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            maxHeight: "100%",
          }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Nombre de Categoria
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
                ? category.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : category
              ).map((currentCategory) => (
                <TableRow
                  key={currentCategory.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{currentCategory.name}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor: currentCategory.status
                          ? "green"
                          : "red",
                        color: "white",
                      }}
                    >
                      {currentCategory.status ? "Activo" : "Inactivo"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={
                            currentCategory.status ? (
                              <RemoveCircleOutlineIcon />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )
                          }
                          sx={{ width: "130px" }}
                          onClick={() =>
                            toggleCategoryStatus(
                              currentCategory.id,
                              currentCategory.status
                            )
                          }
                        >
                          {currentCategory.status ? "Desactivar" : "Activar"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{ marginLeft: 2, width: "130px" }}
                          onClick={() => handleEditModalOpen(
                            currentCategory.id,
                            currentCategory.name
                          )}
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
      </Paper>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={category.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Usuarios por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />

      <Dialog
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            value={editedCategory.name}
            onChange={(e) =>
              setEditedCategory({ ...editedCategory, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditCategory} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableCagory;
