import { React, useState } from "react";
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
} from "../utils/localStorageFavorites";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

const FavoriteButton = ({ id, FavoriteIconON, FavoriteIconOFF }) => {
  const [isFav, setIsFav] = useState(() => {
    const storage = getFavoritesFromStorage();
    return Boolean(storage[id]);
  });

  function toggleFavorite() {
    const storage = getFavoritesFromStorage();

    if (storage[id]) {
      delete storage[id];
      setIsFav(false);
    } else {
      storage[id] = true;
      setIsFav(true);
    }

    saveFavoritesToStorage(storage);
  }

  return <span onClick={toggleFavorite}>{isFav ? FavoriteIconON : FavoriteIconOFF}</span>;
};

export default FavoriteButton;
