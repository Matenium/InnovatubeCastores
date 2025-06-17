import React, { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from "../../utils/favorites"; // Funciones para manejar favoritos
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Cargar los favoritos al montar el componente
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Función para eliminar un video de favoritos
  const handleRemoveFavorite = (videoId) => {
    removeFavorite(videoId);
    setFavorites(getFavorites());
    alert("Video eliminado de favoritos");
  };

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Mis Favoritos
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id.videoId}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                image={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                sx={{
                  width: "100%", // Asegura que la imagen ocupe todo el ancho del contenedor
                  height: "auto", // Mantiene la proporción de la imagen
                }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {video.snippet.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" noWrap>
                  {video.snippet.channelTitle}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveFavorite(video.id.videoId)}
                  sx={{ marginTop: 1 }}
                >
                  Eliminar de favoritos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;