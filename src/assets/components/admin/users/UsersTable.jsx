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
import UserEditModal from "./UserEditModal";
import Grid from "@mui/material/Grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TablePagination from "@mui/material/TablePagination";
import ViewStreamIcon from '@mui/icons-material/ViewStream';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "success", message: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {const res = await fetch("http://3.219.197.64:8090/users/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
      }
    };

    fetchUsers();
  }, []); 

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const toggleUserStatus = async (user) => {
    try {
      const response = await fetch("http://3.219.197.64:8090/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, status: !u.status } : u
        );
        setUsers(updatedUsers);
        setAlert({
          open: true,
          type: "success",
          message: "Estado cambiado exitosamente.",
        });
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } else {
        setAlert({
          open: true,
          type: "error",
          message: "Error al cambiar el estado del usuario.",
        });
      }
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Error en la petición." });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          <AlertTitle>{alert.type === "success" ? "Éxito" : "Error"}</AlertTitle>
          {alert.message}
        </Alert>
      )}

        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              maxHeight: "100%",
            }}
          >
          <Table stickyHeader sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Email
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Rol
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
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          user.role[0].roleName === "Admin"
                            ? "purple"
                            : user.role[0].roleName === "User"
                            ? "gray"
                            : user.role[0].roleName === "Seller"
                            ? "#1976D2"
                            : "gray",
                      }}
                    >
                      {user.role[0].roleName === "Admin"
                        ? "Administrador"
                        : user.role[0].roleName === "User"
                        ? "Usuario"
                        : user.role[0].roleName === "Seller"
                        ? "Vendedor"
                        : user.role[0].roleName}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        backgroundColor: user.status ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {user.status ? "Activo" : "Inactivo"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={
                            user.status ? (
                              <RemoveCircleOutlineIcon />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )
                          }
                          sx={{ width: "130px" }}
                          onClick={() => toggleUserStatus(user)}
                        >
                          {user.status ? "Desactivar" : "Activar"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          startIcon={<ViewStreamIcon />}
                          sx={{ marginLeft: 2, width: "130px" }}
                          onClick={() => handleEditClick(user)}
                        >
                          Detalles
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Usuarios por página"
        labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
  }
      />

      {isModalOpen && (
        <UserEditModal user={selectedUser} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default UsersTable;
