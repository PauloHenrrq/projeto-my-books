const FAVORITES_KEY = "favoriteBooksMap";
export function getFavoritesFromStorage() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};
}
export function saveFavoritesToStorage(map) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(map));
}

export function getAllIdsFromStorage(){
   return Object.keys(getFavoritesFromStorage())
}
