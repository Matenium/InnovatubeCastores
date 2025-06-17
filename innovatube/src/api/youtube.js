import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Función para buscar videos en la API de YouTube
export const searchVideos = async (query) => {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 10,
        key: API_KEY,
      },
    });
    return response.data.items; // Devuelve los videos obtenidos
  } catch (error) {
    console.error("Error al buscar videos en YouTube:", error);
    return [];
  }
};