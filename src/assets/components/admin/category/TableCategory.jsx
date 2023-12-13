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
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/system';
import { css } from '@mui/system';
import BaseModal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

const TableCagory = () => {
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState([]);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    id: null,
    name: "",
  });
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const CreateCategoryButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
  );
  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const handleCreateCategorySubmit = async () => {
    try {
      const response = await fetch("http://3.219.197.64:8090/categories/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: editedCategory.name }),
      });

      if (response.ok) {
        const data = await response.json();
        setCategory([...category, data]);
        setAlert({
          open: true,
          type: "success",
          message: "Categoría creada exitosamente.",
        });
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } else {
        setAlert({
          open: true,
          type: "error",
          message: "Error al crear la categoría.",
        });
      }
    } catch (error) {
      setAlert({ open: true, type: "success", message: "Categoría creada exitosamente." });
      setShouldUpdateTable(true);
    } finally {
      handleCreateModalClose();
    }
  };

  const handleCreateCategory = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://3.219.197.64:8090/categories/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCategory(data);
        setShouldUpdateTable(false);
      } catch (error) { }
    };

    fetchCategories();
  }, [shouldUpdateTable]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const response = await fetch("http://3.219.197.64:8090/categories/delete", {
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
          message: `Categoría ${currentStatus ? "desactivada" : "activada"
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
      const response = await fetch(`http://3.219.197.64:8090/categories/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedCategory),
      });

      if (response.ok) {
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
      <Grid container spacing={2} alignItems="center">
  <Grid item xs={12} md={6}>
    <h1>Categorías Admin</h1>
  </Grid>
  <Grid item xs={12} md={6} textAlign="right">
    <CreateCategoryButton
      variant="contained"
      color="primary"
      onClick={() => handleCreateCategory()}
    >
      Crear Categoría
    </CreateCategoryButton>
  </Grid>
</Grid>
        
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
      <Dialog
        open={createModalOpen}
        onClose={handleCreateModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear Categoría</DialogTitle>
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
          <Button onClick={handleCreateModalClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateCategorySubmit} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default TableCagory;
