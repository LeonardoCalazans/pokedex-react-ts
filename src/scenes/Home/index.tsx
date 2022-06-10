import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Button,
  LinearProgress,
  Badge,
} from "@mui/material";
import { Favorite, Menu as MenuIcon } from "@mui/icons-material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { listPokemons } from "../../services/listPokemons";
import { PokedexCard } from "../../components";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../../contexts/FavoriteContext";

interface PokedexProps {}

const Home: React.FC<PokedexProps> = () => {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, refetch } = useQuery(
    `listPokemons`,
    listPokemons
  );

  const favoritesCount = favorites.length;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Pokedex - Deploy Automatizado</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => navigate("/home/favoritos")}
              color="inherit"
            >
              <Badge badgeContent={favoritesCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
          </Box>
          {/* <Button variant="outlined" startIcon={<Favorite />}>
            Delete
          </Button> */}
        </Toolbar>
      </AppBar>
      {isRefetching && <LinearProgress color="secondary" />}

      <Container>
        <div style={{ marginTop: `1em` }}>
          {isLoading ? (
            <>
              <CircularProgress />
            </>
          ) : (
            <>
              <Button onClick={() => refetch()}>refetch</Button>
              <Grid container spacing={2}>
                {data?.results.map((pokemon) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                    <PokedexCard pokemon={pokemon} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
