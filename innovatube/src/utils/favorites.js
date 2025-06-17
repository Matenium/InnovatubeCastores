export const getFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  };
  
  export const addFavorite = (video) => {
    const favorites = getFavorites();
    localStorage.setItem("favorites", JSON.stringify([...favorites, video]));
  };
  
  export const removeFavorite = (videoId) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((video) => video.id.videoId !== videoId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };