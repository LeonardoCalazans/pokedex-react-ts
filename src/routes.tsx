import React from "react";
import { Route, Switch } from "react-router-dom";
import { FavoriteScreen, HomePokedex, PokemonDetails } from "./scenes";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <Route path="/pokemon/:name">
        <PokemonDetails />
      </Route>
      <Route path="/favoritos">
        <FavoriteScreen />
      </Route>
      <Route path="/">
        <HomePokedex />
      </Route>
    </Switch>
  );
};

export default Routes;
