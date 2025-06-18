// Obtiene los favoritos del usuario por su UID
export const getFavorites = (uid) => {
  if (!uid) return [];
  const favorites = localStorage.getItem(`favorites_${uid}`);
  return favorites ? JSON.parse(favorites) : [];
};

// Agrega un video a los favoritos del usuario
export const addFavorite = (uid, video) => {
  if (!uid) return;
  const favorites = getFavorites(uid);
  if (!favorites.some((fav) => fav.id.videoId === video.id.videoId)) {
    localStorage.setItem(`favorites_${uid}`, JSON.stringify([...favorites, video]));
  }
};

// Elimina un video de los favoritos del usuario
export const removeFavorite = (uid, videoId) => {
  if (!uid) return;
  const favorites = getFavorites(uid);
  const updatedFavorites = favorites.filter((video) => video.id.videoId !== videoId);
  localStorage.setItem(`favorites_${uid}`, JSON.stringify(updatedFavorites));
};

// Limpia todos los favoritos del usuario
export const clearFavorites = (uid) => {
  if (!uid) return;
  localStorage.removeItem(`favorites_${uid}`);
};