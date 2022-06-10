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
      <footer style={{ marginTop: `2em` }}>
        <Typography
          component={"span"}
          variant={"body2"}
          color="textSecondary"
          align="center"
        >
          <p>
            <strong>Trabalho desenvolvido por: </strong>
          </p>
          <p>Leonardo Pinto Silva Calazans - 2020101772</p>
          <p>Lucas Gomes Ribeiro - 2020101323</p>
          <p>Luiz Fernando Nunes de Almeida - 2012101188</p>
          <p>Julio Cesar de Souza Lima - 2013201790</p>
          <p>Wendel Felipe Nascimento Nogueira - 2020101189</p>
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
