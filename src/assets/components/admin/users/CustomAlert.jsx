import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CustomAlert = ({ open, type, message, onClose }) => {
  return (
    <Alert
      severity={type}
      onClose={onClose}
      style={{
        margin: "10px 0",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AlertTitle>{type === "success" ? "Éxito" : "Error"}</AlertTitle>
      {message}
    </Alert>
  );
};

export default CustomAlert;
