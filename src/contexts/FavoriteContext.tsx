import React, { useState } from 'react';
import { PokemonDetail } from '../utils/interfaces/PokemonDetail';

interface FavoriteContextProps {
  favorites: PokemonDetail[];
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

interface FavoriteProviderProps {
  children?: React.ReactNode;
}

const INITAL_FAVORITES_VALUE: PokemonDetail[] = [];

// create context
export const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: INITAL_FAVORITES_VALUE,
  setFavorites: () => console.warn(`setFavorites is not ready`),
});

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>(INITAL_FAVORITES_VALUE);

  return (
    <FavoriteContext.Provider value={{
      favorites,
      setFavorites,
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};