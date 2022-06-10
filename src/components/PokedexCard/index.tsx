import { Favorite } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { PokemonDetail } from "../../interfaces/PokemonDetail";

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { setFavorites, favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/home/pokemon/${pokemon.name}`);
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon]);
  };

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name));
  };

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name);

  return (
    <Card sx={{ maxWidth: 305, maxHeight: 305 }}>
      <CardMedia
        component="img"
        alt={pokemon.name}
        style={{ contain: "size" }}
        width="200"
        height="200"
        image={pokemon.sprites.other?.["official-artwork"].front_default}
        title={pokemon.name}
        onClick={handleClick}
      />
      <CardHeader
        title={pokemon.name}
        subheader={pokemon.types.map((type) => type.type.name).join(", ")}
      />
      <CardActions disableSpacing>
        <IconButton
          onClick={() =>
            isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()
          }
          aria-label="add to favorites"
        >
          <Favorite color={isFavorite ? `error` : `disabled`} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PokedexCard;
