import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validación de ReCaptcha
    if (!captchaVerified) {
      alert("Por favor, verifica el captcha");
      return;
    }

    try {
      // Registro en Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Guardar datos en localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
      });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Usuario registrado con éxito");
      navigate("/login"); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Registro de Usuario
      </Typography>
      <TextField name="firstName" label="Nombre" onChange={handleChange} required />
      <TextField name="lastName" label="Apellido" onChange={handleChange} required />
      <TextField name="username" label="Nombre de usuario" onChange={handleChange} required />
      <TextField name="email" label="Correo electrónico" type="email" onChange={handleChange} required />
      <TextField name="password" label="Contraseña" type="password" onChange={handleChange} required />
      <TextField name="confirmPassword" label="Confirmar contraseña" type="password" onChange={handleChange} required />
      <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleCaptcha} />
      <Button type="submit" variant="contained">
        Registrarse
      </Button>
    </Box>
  );
};

export default Register;