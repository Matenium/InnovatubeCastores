import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          InnovaTube
        </Typography>
        <Button color="inherit" href="/">
          Inicio
        </Button>
        <Button color="inherit" href="/favorites">
          Favoritos
        </Button>
        <Button color="inherit" href="/login">
          Iniciar Sesión
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;