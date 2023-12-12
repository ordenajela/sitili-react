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
import EditIcon from "@mui/icons-material/Edit";
import UserEditModal from "./UserEditModal";
import Grid from "@mui/material/Grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Typography } from "@mui/material";
import ViewStreamIcon from '@mui/icons-material/ViewStream';

const PendingTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const fetchUsers = async () => {
    try {const res = await fetch(
        "http://3.219.197.64:8090/aceptSeller/listSellersNa",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
    }
  };

  useEffect(() => {
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
        fetchUsers();
        setAlert((prevAlert) => ({
          ...prevAlert,
          open: true,
          type: "success",
          message: "Estado cambiado exitosamente.",
        }));
        setTimeout(() => {
          setAlert((prevAlert) => ({ ...prevAlert, open: false }));
        }, 3000);
      } else {
        setAlert((prevAlert) => ({
          ...prevAlert,
          open: true,
          type: "error",
          message: "Error al cambiar el estado del usuario.",
        }));
      }
    } catch (error) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        open: true,
        type: "error",
        message: "Error en la petición.",
      }));
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
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

      {users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
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
              {users.map((user) => (
                <TableRow
                  key={user.email}
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
                          user.role_id === "Admin"
                            ? "purple"
                            : user.role_id === "User"
                            ? "gray"
                            : user.role_id === "Seller"
                            ? "#ADD8E6"
                            : "gray",
                      }}
                    >
                      {user.role_id === "Admin"
                        ? "Administrador"
                        : user.role_id === "User"
                        ? "Usuario"
                        : user.role_id === "Seller"
                        ? "Vendedor"
                        : user.role_id}
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
                          startIcon={<ViewStreamIcon/>}
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
      ) : (
        <div>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={6}></Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h3">
                No hay usuarios pendientes por el momento. Vuelve más tarde :D
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}

      {isModalOpen && (
        <UserEditModal
          user={selectedUser}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PendingTable;
