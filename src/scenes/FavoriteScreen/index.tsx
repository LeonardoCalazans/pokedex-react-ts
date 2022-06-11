import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import React, { useContext } from "react";

import { FavoriteContext } from "../../contexts/FavoriteContext";
import { PokedexCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { firstUpperCase } from "../../utils/modules/validations";

interface FavoriteScreenProps {}

const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            onClick={goBack} 
            edge="start" 
            color="inherit" 
            aria-label="Voltar">
            <ArrowBack />
            Voltar
          </IconButton>
          <Typography 
            sx={{
              flexGrow: 6,
              textAlign: "center", 
            }}
            variant="h5">
              Pokemons Favoritos
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <div style={{ marginTop: `1em` }}>
          <Grid container spacing={2}>
            {favorites?.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={firstUpperCase(pokemon.name)}>
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteScreen;
