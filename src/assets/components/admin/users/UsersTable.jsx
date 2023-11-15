import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

// Importa el componente del modal
import UserEditModal from "./UserEditModal";

const UsersTable = ({ darkMode, setDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8090/users/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  // Función para abrir el modal y establecer el usuario seleccionado
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }} >Email</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} >Estado</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} >Contraseña</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell >{user.email}</TableCell>
                <TableCell>{user.status ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<RemoveCircleOutlineIcon />}
                  >
                    Desactivar
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    sx={{ marginLeft: 2 }}
                    // Usa la función para abrir el modal al hacer clic
                    onClick={() => handleEditClick(user)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Renderiza el modal si está abierto */}
      {isModalOpen && (
        <UserEditModal
          user={selectedUser}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UsersTable;
