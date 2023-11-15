import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UserEditModal = ({ user, handleCloseModal }) => {
  // Puedes utilizar el objeto 'user' para mostrar la información en el modal

  return (
    <Modal
      open={true}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", p: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar Usuario
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Muestra la información del usuario dentro del modal */}
          Email: {user.email}
          <br />
          Estado: {user.status ? "Activo" : "Inactivo"}
          <br />
          Contraseña: {user.password}
        </Typography>
        <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default UserEditModal;
