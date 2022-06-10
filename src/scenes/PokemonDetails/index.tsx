import { ArrowBack, Favorite } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  LinearProgress,
  Box,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { getPokemonDetails } from "../../services/getPokemonDetails";

interface PokemonDetailsProps {}

interface PokemonQueryParams {
  name: any;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const { name } = useParams<{ name: any }>();

  const { data, isRefetching, isLoading } = useQuery(
    `pokemon-${name}`,
    () => getPokemonDetails(name),
    {
      cacheTime: 1000 * 60 * 60,
      staleTime: 20000,
    }
  );

  const selectedPokemonDetails = data;

  const goBack = () => navigate(-1);

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails]);
  };

  const removePokemonFromFavorites = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(
      favorites.filter((poke: any) => poke.name !== selectedPokemonDetails.name)
    );
  };

  const isFavorite = favorites.some(
    (poke: any) => poke.name === selectedPokemonDetails?.name
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={goBack}
            edge="start"
            color="inherit"
            aria-label="Voltar"
          >
            <ArrowBack />
            Voltar
          </IconButton>
          <Typography
            sx={{
              flexGrow: 12,
              textAlign: "center",
            }}
            variant="h4"
          >
            {selectedPokemonDetails?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              onClick={() =>
                isFavorite
                  ? removePokemonFromFavorites()
                  : addPokemonToFavorite()
              }
              aria-label="add to favorites"
            >
              <Favorite color={isFavorite ? `error` : `disabled`} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isRefetching && <LinearProgress />}

      <Container>
        <img
          alt=""
          width="50%"
          src={
            selectedPokemonDetails?.sprites.other?.["official-artwork"]
              .front_default
          }
        />

        <Typography variant="h2">
          {selectedPokemonDetails?.species.name}
        </Typography>

        <Typography>
          Tipo: {selectedPokemonDetails?.types
            .map((type) => {
              return type.type.name;
            })
            .join(", ")}
        </Typography>

        <div>Altura: {selectedPokemonDetails?.height}</div>
        <div>Peso: {selectedPokemonDetails?.weight}</div>

        <div>
          Habilidades: {selectedPokemonDetails?.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}
        </div>
      </Container>
    </>
  );
};

export default PokemonDetails;
