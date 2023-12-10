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

const TableCagory = () => {

  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
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
        console.log("Usuarios:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleCategoryStatus = async (categoryId) => {
    console.log("categoryId:", categoryId);
    try {
      const response = await fetch(
        `http://localhost:8090/categories/delete/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        // Handle success
        const updatedCategories = category.map((c) =>
          c.id === categoryId ? { ...c, status: !c.status } : c
        );
        setCategory(updatedCategories);
        setAlert({
          open: true,
          type: "success",
          message: "Estado cambiado exitosamente.",
        });
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } else {
        console.error("Error al cambiar el estado de la categoría");
        setAlert({
          open: true,
          type: "error",
          message: "Error al cambiar el estado de la categoría.",
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setAlert({ open: true, type: "error", message: "Error en la petición." });
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
                            toggleCategoryStatus(currentCategory.id)
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
                          onClick={() => {}}
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
    </div>
  );
};

export default TableCagory;
