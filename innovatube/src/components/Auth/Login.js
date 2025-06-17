import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Inicio de sesión exitoso");
      navigate("/"); // Redirige a la página principal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Iniciar Sesión
      </Typography>
      <TextField name="email" label="Correo electrónico" type="email" onChange={handleChange} required />
      <TextField name="password" label="Contraseña" type="password" onChange={handleChange} required />
      <Button type="submit" variant="contained">
        Iniciar Sesión
      </Button>
      <Button variant="text" onClick={() => navigate("/register")}>
        ¿Nuevo usuario? Regístrate aquí
      </Button>
      <Button variant="text" onClick={() => navigate("/forgot-password")}>
        ¿Olvidaste tu contraseña?
      </Button>
    </Box>
  );
};

export default Login;