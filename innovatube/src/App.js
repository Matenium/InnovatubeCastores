import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VideoList from "./components/Main/VideoList";
import Favorites from "./components/Main/Favorites";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const auth = getAuth();

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado con el usuario actual
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [auth]);

  const handleLogout = () => {
    auth.signOut();
    alert("Sesión cerrada");
  };

  return (
    <Router>
      {/* Barra de navegación */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              InnovaTube
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/favorites">
            Favoritos
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box sx={{ padding: "20px" }}>
        {/* Mostrar el texto de bienvenida si el usuario está autenticado */}
        {user && (
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Bienvenido: {user.email}
          </Typography>
        )}

        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;