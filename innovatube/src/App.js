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
  const [user, setUser] = useState(null);
  const [logoutSignal, setLogoutSignal] = useState(false); // NUEVO: señal para limpiar favoritos
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("favorites");
    setLogoutSignal((prev) => !prev); // NUEVO: cambia la señal para limpiar favoritos
    alert("Sesión cerrada");
  };

  return (
    <Router>
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

      <Box sx={{ padding: "20px" }}>
        {user && (
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Bienvenido: {user.email}
          </Typography>
        )}

        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/favorites" element={<Favorites logoutSignal={logoutSignal} />} /> {/* PASA LA SEÑAL */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;