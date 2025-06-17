import React, { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { TextField, Button, Box, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Si el correo está registrado, se enviará un enlace de recuperación.");
    } catch (error) {
      setMessage("Error al enviar el correo de recuperación. Intenta de nuevo.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Recuperar Contraseña
      </Typography>
      <TextField
        label="Correo Electrónico"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handlePasswordReset} fullWidth>
        Enviar Enlace de Recuperación
      </Button>
      {message && (
        <Typography variant="body1" sx={{ marginTop: 2, color: "green" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ForgotPassword;