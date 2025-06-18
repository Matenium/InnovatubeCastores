import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { TextField, Button, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { searchVideos } from "../../api/youtube";
import { addFavorite } from "../../utils/favorites";

const VideoList = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

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
    if (!video || !video.id || !video.id.videoId) {
      alert("El video no tiene un ID válido.");
      return;
    }
    addFavorite(user.uid, video);
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

      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 2,
          justifyContent: { xs: "flex-start", sm: "center" },
        }}
      >
        {videos.map((video) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
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
                  width: "100%",
                  height: "auto",
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
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
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