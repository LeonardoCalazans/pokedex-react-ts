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
import { firstUpperCase } from "../../utils/modules/validations";

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
            {firstUpperCase(selectedPokemonDetails?.name as string)}
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

      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt=""
          width="50%"
          src={
            selectedPokemonDetails?.sprites.other?.["official-artwork"]
              .front_default
          }
        />

        <Typography variant="h2">
          {firstUpperCase(selectedPokemonDetails?.species.name as string)}
        </Typography>
        <view style={{ alignItems: "flex-start" }}>
          <Typography>
            Type:{" "}
            {selectedPokemonDetails?.types
              .map((type) => {
                return firstUpperCase(type.type.name);
              })
              .join(", ")}
          </Typography>

          <div>Height: {selectedPokemonDetails?.height}</div>
          <div>Weight: {selectedPokemonDetails?.weight}</div>

          <div>
            Skills:{" "}
            {selectedPokemonDetails?.abilities
              .map((ability) => firstUpperCase(ability.ability.name))
              .join(", ")}
          </div>
        </view>
      </Container>
    </>
  );
};

export default PokemonDetails;
