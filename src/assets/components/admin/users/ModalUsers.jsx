import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {styled,Box,TextField,Select,MenuItem,Button,Alert,} from "@mui/material";
import { Modal as BaseModal } from "@mui/base/Modal";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MuiModal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


export default function ModalUsers({ handleUserAdded }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const userTypeMap = {
    cliente: 4,
    vendedor: 3,
    administrador: 2,
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleAddUser = async () => {
    const userTypeValue = userTypeMap[userType];
    setLoading(true);

    if (
      email === "" ||
      password === "" ||
      name === "" ||
      lastName === "" ||
      userType === ""
    ) {
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://3.219.197.64:8090/registerNewUser",
        {
          email: email,
          password: password,
          first_name: name,
          last_name: lastName,
          role: userTypeValue,
        }
      );

      if (response.status === 200) {
        handleUserAdded(response.data);
        handleClose();
        window.location.reload();
      } else {
      }
    } catch (error) {
      setErrorMessage("Se ha creado exitosamente el usuario");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setEmail("");
      setPassword("");
      setName("");
      setLastName("");
      setUserType("");
      setShowAlert(false);
    }
  };

  const handleModalClose = () => {
    setErrorModalOpen(false);
    window.location.reload();
  };


  return (
    <div>
      <TriggerButton
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={36} color="inherit" />
        ) : (
          "Agregar Usuario"
        )}
      </TriggerButton>
      <MuiModal open={errorModalOpen} onClose={handleModalClose}>
        <ModalContent sx={{ ...style, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <div style={{ textAlign: "center" }}>
            <CheckCircleIcon sx={{ fontSize: 100, color: "green" }} />
            <h3>Usuario SITILI Creado!</h3>
            <p>{errorMessage}</p>
            <Button onClick={handleModalClose}>Aceptar</Button>
          </div>
        </ModalContent>
      </MuiModal>

      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <h3 id="unstyled-modal-title" className="modal-title">
            Crear Usuario
          </h3>
          <p id="unstyled-modal-description" className="modal-description">
            Complete los datos del usuario:
          </p>

          <form>
            <TextField
              label="Correo"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "16px" }}
              fullWidth
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "16px" }}
              fullWidth
            />
            <TextField
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "16px" }}
              fullWidth
            />
            <TextField
              label="Apellido"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ marginBottom: "16px" }}
              fullWidth
            />
            <InputLabel htmlFor="user-type" sx={{ marginBottom: "8px" }}>
              Tipo de Usuario
            </InputLabel>
            <Select
              label="Tipo de Usuario"
              variant="outlined"
              value={userType}
              onChange={handleUserTypeChange}
              sx={{ marginBottom: "16px" }}
              fullWidth
            >
              <MenuItem value="vendedor">Vendedor</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
              <MenuItem value="usuario">Usuario</MenuItem>
            </Select>
            

            {showAlert && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                Todos los campos son requeridos.
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUser}
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                "Agregar Usuario"
              )}
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.20)"
  };
  padding: 1rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
);
