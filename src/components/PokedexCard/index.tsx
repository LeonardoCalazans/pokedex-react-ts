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
import { PokemonDetail } from "../../utils/interfaces/PokemonDetail";
import { firstUpperCase } from "../../utils/modules/validations";

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { setFavorites, favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const pokemonName = firstUpperCase(pokemon.name);

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
    <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
      <CardMedia
        component="img"
        alt={pokemonName}
        style={{ contain: "size" }}
        width="200"
        height="200"
        image={pokemon.sprites.other?.["official-artwork"].front_default}
        title={pokemonName}
        onClick={handleClick}
      />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          placeholder={pokemonName}
          title={pokemonName}
          subheader={pokemon.types
            .map((type) => firstUpperCase(type.type.name))
            .join(", ")}
        />
        <CardActions>
          <IconButton
            onClick={() =>
              isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()
            }
            aria-label="add to favorites"
          >
            <Favorite color={isFavorite ? `error` : `disabled`} />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default PokedexCard;
