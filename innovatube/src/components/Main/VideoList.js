import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { TextField, Button, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { searchVideos } from "../../api/youtube"; // Función para buscar videos en la API de YouTube
import { addFavorite } from "../../utils/favorites"; // Función para agregar videos a favoritos

const VideoList = () => {
  const [query, setQuery] = useState(""); // Estado para el término de búsqueda
  const [videos, setVideos] = useState([]); // Estado para los videos obtenidos de la API
  const auth = getAuth();
  const user = auth.currentUser; // Usuario autenticado actual

  // Función para buscar videos
  const handleSearch = async () => {
    if (!user) {
      alert("Debes iniciar sesión para buscar videos.");
      return;
    }
    const results = await searchVideos(query);
    setVideos(results);
  };

  // Función para agregar un video a favoritos
  const handleAddFavorite = (video) => {
    if (!user) {
      alert("Debes iniciar sesión para guardar videos en favoritos.");
      return;
    }
    addFavorite(video);
    alert("Video agregado a favoritos");
  };

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Buscar Videos
      </Typography>
      <TextField
        label="Buscar videos"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Buscar
      </Button>

      {/* Contenedor de videos */}
      <Grid
        container
        spacing={3} // Espaciado entre los elementos
        sx={{
          marginTop: 2,
          justifyContent: { xs: "flex-start", sm: "center" }, // Alineación responsiva
        }}
      >
        {videos.map((video) => (
          <Grid
            item
            xs={12} // En móviles, ocupa toda la fila
            sm={6}  // En tablets, dos columnas
            md={4}  // En pantallas medianas, tres columnas
            lg={3}  // En pantallas grandes, cuatro columnas
            key={video.id.videoId}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
                  color="primary"
                  onClick={() => handleAddFavorite(video)}
                  sx={{
                    marginTop: 1,
                    display: "block", // Asegura que el botón sea un bloque
                    marginLeft: "auto", // Centra el botón horizontalmente
                    marginRight: "auto", // Centra el botón horizontalmente
                  }}
                >
                  Agregar a favoritos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VideoList;