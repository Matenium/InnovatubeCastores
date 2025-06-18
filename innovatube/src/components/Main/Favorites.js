import React, { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from "../../utils/favorites";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { getAuth } from "firebase/auth";

const Favorites = ({ logoutSignal }) => {
  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  // Cargar favoritos cuando cambia el usuario o la señal de logout
  useEffect(() => {
    if (user) {
      setFavorites(getFavorites(user.uid));
    } else {
      setFavorites([]);
    }
    // eslint-disable-next-line
  }, [user, logoutSignal]);

  // Eliminar un video de favoritos
  const handleRemoveFavorite = (videoId) => {
    if (!user) return;
    removeFavorite(user.uid, videoId);
    setFavorites(getFavorites(user.uid));
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